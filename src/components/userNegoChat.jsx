import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "../css/userNegoChat.css";
import SReviewPopup from "../pages/sellerReviewPage.jsx";
import { IoCheckboxOutline } from "react-icons/io5";
import spFilled from "../resources/images/sweet-potato-Filled.png"; // 색이 있는 고구마

const UserNegoChat = ({ sellerUid, user_id, post }) => {
  const [interestedBuyers, setInterestedBuyers] = useState([]); // 구매 희망 구매자 리스트
  const [activeChat, setActiveChat] = useState(null); // 현재 활성화된 채팅 ID
  const [messages, setMessages] = useState([]); // 메시지 리스트
  const [message, setMessage] = useState(null); // 서버에 저장할 메세지
  const [inputMessage, setInputMessage] = useState(""); // 입력된 메시지
  const [selectedBuyer, setSelectedBuyer] = useState(null); // 구매 확정자 / 확정된 구매자 ID 저장
  const [isPurchased, setIsPurchased] = useState(false); // 구매 확정 여부
  const [isBuyerConfirmed, setIsBuyerConfirmed] = useState(false); // 구매 확정 버튼 활성화 여부
  const [newPost, setNewPost] = useState(post); // 판매자 정보
  const [showSReviewPopup, setShowSReviewPopup] = useState(false); // 판매자 작성 리뷰
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!post?.id) return;
      try {
        const response = await fetch(
          `http://localhost:18090/api/gogumapost/${post.id}`
        );
        const data = await response.json();
        console.log("불러온 게시글 데이터:", data);

        // user_list가 객체인 경우에만 map을 적용
        const buyers = data.user_list
          ? Object.entries(data.user_list).map(([id, name]) => ({
              id: Number(id),
              name,
            }))
          : [];

        setNewPost({
          id: data.pid,
          sellerUid: data.uid,
          selectedUser: data.selected_user,
          regionGu: data.loca_gu,
          regionDong: data.loca_dong,
          title: data.post_title,
          image: data.post_photo,
          content: data.post_content,
          category: data.post_category,
          price: data.post_price || "가격 미정",
          user_list: buyers,
          reportCnt: data.report_cnt,
          updateTime: data.upd_date,
          seller: data.nickname,
          thumbnail: data.thumbnail,
          userRate: data.user_rate,
        });

        setInterestedBuyers(buyers);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };
    fetchPostData();
  }, [post?.id]);

  useEffect(() => {
    if (!newPost) return;
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:18090/api/gogumauser/session",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUser(data);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("로그인 상태 확인 중 오류 발생:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [newPost]);

  useEffect(() => {
    if (!newPost || !user) {
      console.log("⛔ newPost 또는 user가 존재하지 않음");
      return;
    }

    setInterestedBuyers(newPost.user_list || []);

    const fetchChatData = async () => {
      try {
        const response = await fetch(
          `http://localhost:18090/api/gogumachat/${newPost?.id}`
        );
        const data = await response.json();
        setMessages(
          data.map((chat) => ({
            cid: chat.cid,
            order_id: chat.order_id,
            pid: chat.pid,
            writer_uid: chat.writer_uid,
            seller_uid: chat.seller_uid,
            buyer_uid: chat.buyer_uid,
            chat_content: chat.chat_content,
            upd_date: chat.upd_date,
          }))
        );
      } catch (error) {
        console.error("채팅 데이터 불러오기 실패:", error);
      }
    };
    fetchChatData();
  }, [newPost, user]);

  const updateInterestBuyers = async (updatedPost) => {
    try {
      console.log("Sending request to update interest buyers:", updatedPost);
      const response = await fetch(
        `http://localhost:18090/api/gogumapost/${updatedPost.id}/userList`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ user_list: updatedPost.user_list }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response error data:", errorData);
        throw new Error("유저 리스트 갱신 실패");
      }

      alert("구매 희망 접수 완료 되었습니다.");
    } catch (error) {
      console.error("구매 희망 등록 오류:", error);
      alert("구매 희망 등록 중 오류가 발생했습니다.");
    }
  };

  const handleInterest = () => {
    console.log(interestedBuyers);
    if (
      isBuyerConfirmed ||
      isPurchased ||
      interestedBuyers.find((buyer) => {
        return buyer.id === user.uid;
      })
    ) {
      return;
    }

    if (!interestedBuyers.some((buyer) => buyer.id === user.uid)) {
      const newBuyer = {
        id: user.uid,
        name: user.nickname,
      };
      const updatedBuyers = [...interestedBuyers, newBuyer];
      setInterestedBuyers(updatedBuyers);

      const userListObject = updatedBuyers.reduce((acc, buyer) => {
        acc[buyer.id] = buyer.name;
        return acc;
      }, {});

      const updatedPost = {
        ...newPost,
        user_list: userListObject,
      };

      updateInterestBuyers(updatedPost);
    }
  };

  const handleConfirmBuyer = (buyerId) => {
    setSelectedBuyer(buyerId);
    setIsBuyerConfirmed(true);
  };

  const handlePurchaseConfirm = async () => {
    setIsPurchased(true);
    setIsBuyerConfirmed(true);
    setShowSReviewPopup(true);
    const purchaseData = {
      seller_uid: sellerUid,
      buyer_uid: user_id,
      pid: post.id,
      price: post.price,
      upd_date: new Date().toISOString(),
    };
    try {
      const response = await fetch(
        "http://localhost:18090/api/gogumapurchase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(purchaseData),
        }
      );
      console.log(purchaseData);
      if (response.ok) {
        alert("거래가 성공적으로 완료되었습니다!");
        setIsPurchased(true);
        setShowSReviewPopup(true);
      } else {
        throw new Error("거래 완료 요청 실패");
      }
    } catch (error) {
      console.error("거래 완료 오류:", error);
      alert("거래 완료 중 오류가 발생했습니다.");
    }
  };

  const handleReviewSubmit = (reviewData) => {
    setReviews([...reviews, reviewData]);
    handleCloseReviewPopup();
  };

  const handleCloseReviewPopup = () => {
    setShowSReviewPopup(false);
  };

  const handleStartChat = (buyerId) => {
    setActiveChat((prevActiveChat) =>
      prevActiveChat === buyerId ? null : buyerId
    );
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    if (!newPost || !user) {
      console.error("필수 상태가 초기화되지 않았습니다.");
      return;
    }

    const currentIsSeller = user.uid === newPost.sellerUid;
    createMessage(currentIsSeller);

    setInputMessage("");
  };

  const createMessage = (currentIsSeller) => {
    const newMessage = {
      order_id: messages.length + 1,
      pid: newPost.id,
      writer_uid: user.uid,
      seller_uid: currentIsSeller ? user.uid : newPost.sellerUid,
      buyer_uid: currentIsSeller ? newPost.sellerUid : user.uid,
      chat_content: inputMessage,
      updateTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessage(newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const updateSendMessage = useCallback(async (message) => {
    if (!message) return;

    console.log("내가 만든 메세지 2 : " + JSON.stringify(message));

    try {
      const response = await fetch(`http://localhost:18090/api/gogumachat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `유저 채팅 삽입 실패: ${response.status} ${JSON.stringify(errorData)}`
        );
      }
    } catch (error) {
      console.error("채팅 메시지 전송 오류:", error);
      alert("채팅 메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  }, []);

  useEffect(() => {
    if (message) {
      updateSendMessage(message);
      setMessage(null);
    }
  }, [message, updateSendMessage]);

  return (
    <div>
      <div className="nego-product-footer">
        <button
          className="nego-interest-button"
          onClick={handleInterest}
          disabled={isBuyerConfirmed || isPurchased}
        >
          구매 희망
        </button>

        <div className="nego-interested-buyers">
          <h3>구매 희망자</h3>
          <ul>
            {console.log("interestedBuyers:", interestedBuyers)}
            {interestedBuyers.length > 0 ? (
              interestedBuyers.map((buyer) => (
                <li key={buyer.id} className="nego-buyer-item">
                  <div className="nego-button-container">
                    <span>{buyer.name}</span>
                    {selectedBuyer === buyer.id ? (
                      <span className="nego-confirmed-text">거래 확정됨</span>
                    ) : (
                      <button
                        onClick={() => handleConfirmBuyer(buyer.id)}
                        disabled={isBuyerConfirmed || isPurchased}
                        className={
                          isBuyerConfirmed || isPurchased
                            ? "nego-disabled-button"
                            : ""
                        }
                      >
                        거래 확정
                        <IoCheckboxOutline className="nego-chat-icon" />
                      </button>
                    )}
                    <button onClick={() => handleStartChat(buyer.id)}>
                      <span className="nego-chat-text">
                        {activeChat === buyer.id ? "채팅 닫기" : "호박고구마톡"}
                      </span>
                      <img
                        src={spFilled || null}
                        alt="고구마 아이콘"
                        className="nego-chat-icon"
                      />
                    </button>
                  </div>

                  {activeChat === buyer.id && (
                    <div className="nego-chat-container">
                      <div className="nego-chat-box">
                        {messages.map((msg) => (
                          <div
                            key={msg.order_id}
                            className={`nego-chat-message ${
                              msg.writer_uid === newPost.sellerUid
                                ? "seller"
                                : "buyer"
                            }`}
                          >
                            <img
                              src={
                                msg.writer_uid === newPost.sellerUid
                                  ? newPost.thumbnail || null
                                  : user.thumbnail || null
                              }
                              alt={
                                msg.writer_uid === newPost.sellerUid
                                  ? "판매자"
                                  : "구매자"
                              }
                              className="nego-profile-img"
                            />
                            <div className="nego-message-container">
                              <div className="nego-message-text">
                                {msg.chat_content}
                              </div>
                              <div className="nego-message-time">
                                {msg.updateTime}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="nego-chat-input">
                        <input
                          type="text"
                          placeholder="메시지를 입력하세요..."
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button onClick={() => handleSendMessage()}>
                          {user_id === newPost?.sellerUid
                            ? "판매자 전송"
                            : "구매자 전송"}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>구매 희망자가 없습니다.</p>
            )}
          </ul>
        </div>
      </div>

      {selectedBuyer && !isPurchased && (
        <div className="nego-purchase-popup">
          <div className="nego-popup-content">
            <h3>거래가 완료되었습니다</h3>
            <button
              className="nego-confirm-button"
              onClick={handlePurchaseConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}

      {selectedBuyer && showSReviewPopup && (
        <SReviewPopup
          sellerId={sellerUid}
          buyerId={user_id}
          onClose={handleCloseReviewPopup}
          onSubmit={handleReviewSubmit}
        />
      )}

      {isPurchased && (
        <div className="nego-purchase-confirmation">
          <h3>거래가 완료되었습니다!</h3>
        </div>
      )}
    </div>
  );
};

UserNegoChat.propTypes = {
  sellerUid: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default UserNegoChat;
