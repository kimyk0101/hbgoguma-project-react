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
  const [newPost, setNewPost] = useState(null); // 판매자 정보
  const [showSReviewPopup, setShowSReviewPopup] = useState(false); // 판매자 작성 리뷰
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!post?.id) return; // post가 없으면 실행하지 않음
      try {
        const response = await fetch(
          `http://localhost:18090/api/gogumapost/${post.id}`
        );
        const data = await response.json();
        console.log("불러온 게시글 데이터:", data); // 디버깅용 로그 추가

        // user_list가 배열인 경우에만 map을 적용
        const buyers = Array.isArray(data.user_list)
          ? data.user_list.map(([id, name]) => ({
              id,
              name,
            }))
          : []; // 배열이 아니면 빈 배열로 처리

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
          user_list: buyers, // user_list를 interestedBuyers 형식으로 변환하여 저장
          reportCnt: data.report_cnt,
          updateTime: data.upd_date,
          seller: data.nickname,
          thumbnail: data.thumbnail,
          userRate: data.user_rate,
        });

        setInterestedBuyers(buyers); // interestedBuyers 상태 업데이트
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };
    fetchPostData();
  }, [post?.id]);

  useEffect(() => {
    if (!newPost) return;
    // 로그인 상태 확인 함수
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:18090/api/gogumauser/session",
          {
            method: "GET",
            credentials: "include", // 쿠키를 포함하여 요청
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUser(data); // 로그인된 사용자 정보 저장
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
    if (
      newPost?.user_list.find((buyer) => {
        return user?.uid === buyer.id;
      })
    ) {
      setInterestedBuyers((prevBuyers) => [
        ...prevBuyers,
        {
          id: user.uid,
          name: user.nickname,
        },
      ]);
    }

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

  const updateInterestBuyers = async () => {
    if (!newPost) {
      console.error("newPost가 아직 로드되지 않았습니다.");
      return;
    }

    // user_list를 Map 형식으로 변환
    const userListMap = {};
    interestedBuyers.forEach((buyer) => {
      userListMap[buyer.id] = buyer.name;
    });

    const updatedPost = {
      ...newPost,
      user_list: userListMap,
    };

    try {
      console.log("Sending request to update interest buyers:", updatedPost);
      const response = await fetch(
        `http://localhost:18090/api/gogumapost/${updatedPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 쿠키를 포함하여 요청
          body: JSON.stringify(updatedPost),
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

  // 구매 희망 버튼 클릭 시
  const handleInterest = () => {
    console.log(interestedBuyers);

    // 거래가 완료되었거나 구매자가 확정된 경우, 유저가 이미 구매희망 버튼을 눌렀던 경우, 버튼 클릭을 막음
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
      setInterestedBuyers((prevBuyers) => [...prevBuyers, newBuyer]);
      updateInterestBuyers();
    }
  };

  // 구매 확정 버튼 클릭 시
  const handleConfirmBuyer = (buyerId) => {
    setSelectedBuyer(buyerId); // 구매 확정한 사람의 ID 저장
    setIsBuyerConfirmed(true); // 버튼 비활성화 상태로 변경
  };

  // 구매 확정 팝업 확인 버튼
  const handlePurchaseConfirm = async () => {
    setIsPurchased(true); // 거래가 완료되면 상태 변경
    setIsBuyerConfirmed(true); // 거래가 완료되면 구매 확정 버튼도 비활성화
    setShowSReviewPopup(true); // 거래 완료 후 리뷰 팝업 띄우기
    const purchaseData = {
      seller_uid: sellerUid, // 판매자 UID
      buyer_uid: user_id, // 구매자 UID
      pid: post.id, // 게시글 ID
      price: post.price, // 상품 가격
      upd_date: new Date().toISOString(), // 현재 날짜 및 시간
    };
    try {
      const response = await fetch(
        "http://localhost:18090/api/gogumapurchase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 쿠키를 포함하여 요청
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

  // 리뷰 제출
  const handleReviewSubmit = (reviewData) => {
    setReviews([...reviews, reviewData]);
    handleCloseReviewPopup();
  };

  // 리뷰 닫기
  const handleCloseReviewPopup = () => {
    setShowSReviewPopup(false);
  };

  // 채팅 시작 버튼 클릭 시 활성화/비활성화 토글
  const handleStartChat = (buyerId) => {
    setActiveChat((prevActiveChat) =>
      prevActiveChat === buyerId ? null : buyerId
    );
    // setMessages([]); // 새로운 채팅 시작 시 메시지 초기화 제거
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    if (!newPost || !user) {
      console.error("필수 상태가 초기화되지 않았습니다.");
      return;
    }

    // isSeller 상태 업데이트 후 createMessage 호출
    const currentIsSeller = user.uid === newPost.uid;
    createMessage(currentIsSeller);

    setInputMessage("");
  };

  const createMessage = (currentIsSeller) => {
    const newMessage = {
      order_id: messages.length + 1,
      pid: newPost.id,
      writer_uid: user.uid,
      seller_uid: currentIsSeller ? user.uid : newPost.uid,
      buyer_uid: currentIsSeller ? newPost.uid : user.uid,
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
      {/* 상품 설명 끝난 후, 구매 희망자 리스트를 하단에 위치 */}
      <div className="nego-product-footer">
        {/* 구매자일 경우 "구매 희망" 버튼 표시 */}
        {/* {user_id !== "" && user_id !== sellerUid && (
          <button
            className="nego-interest-button"
            onClick={handleInterestToggle}
            disabled={isBuyerConfirmed || isPurchased}
          >
            구매 희망
          </button>
        )} */}
        {user_id !== newPost?.sellerUid && (
          <button
            className="nego-interest-button"
            onClick={handleInterest}
            disabled={isBuyerConfirmed || isPurchased} // 거래 완료되거나 구매자가 확정되면 비활성화
          >
            구매 희망
          </button>
        )}
        {user_id !== newPost?.sellerUid && (
          <div className="nego-interested-buyers">
            <h3>구매 희망자</h3>
            <ul>
              {interestedBuyers.length > 0 ? (
                interestedBuyers.map((buyer) => (
                  <li key={buyer.id} className="nego-buyer-item">
                    <div className="nego-button-container">
                      <span>{buyer.name}</span>

                      {selectedBuyer === buyer.id ? ( // 선택된 구매자만 "거래 확정됨" 표시
                        <span className="nego-confirmed-text">거래 확정됨</span>
                      ) : (
                        <button
                          onClick={() => handleConfirmBuyer(buyer.id)}
                          disabled={isBuyerConfirmed || isPurchased} // 거래 완료되면 비활성화
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
                          {activeChat === buyer.id
                            ? "채팅 닫기"
                            : "호박고구마톡"}
                        </span>

                        <img
                          src={spFilled}
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
                              key={msg.order_id} // order_id로 메시지 고유식별
                              className={`nego-chat-message ${
                                msg.writer_uid === user.uid ? "seller" : "buyer"
                              }`}
                            >
                              <img
                                src={
                                  msg.writer_uid === user.uid
                                    ? "https://www.w3schools.com/w3images/avatar2.png"
                                    : "https://www.w3schools.com/howto/img_avatar.png"
                                }
                                alt={
                                  msg.writer_uid === user.uid
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
                          {/* 현재 사용자가 판매자인 경우 */}
                          {user_id === newPost?.sellerUid && (
                            <button onClick={() => handleSendMessage()}>
                              판매자 전송
                            </button>
                          )}

                          {/* 현재 사용자가 구매자인 경우 */}
                          {user_id && (
                            <button onClick={() => handleSendMessage()}>
                              구매자 전송
                            </button>
                          )}
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
        )}
      </div>

      {/* 거래 완료 팝업 */}
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

      {/* 거래 완료 후 리뷰 팝업 자동 표시 */}
      {selectedBuyer && showSReviewPopup && (
        <SReviewPopup
          sellerId={sellerUid} // 판매자 UID 전달
          buyerId={user_id} // 구매자 UID 전달
          onClose={handleCloseReviewPopup}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* 거래 완료 후 상태 표시 */}
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
