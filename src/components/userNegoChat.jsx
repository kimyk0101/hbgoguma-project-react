import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../css/userNegoChat.css";
import SReviewPopup from "../pages/sellerReviewPage.jsx";
import { IoCheckboxOutline } from "react-icons/io5";
import spFilled from "../resources/images/sweet-potato-Filled.png"; // 색이 있는 고구마

// 채팅 데이터 종류
// long cid	- 채팅id
// long pid	- 게시글id
// long buyer_uid 	- 구매자id
// long send_uid	- 보낸 메세지id
// long receive_uid	- 받는 메세지id
// string chatContent	- 메세지
// Date updateTime	- 메세지 시간

const UserNegoChat = ({ sellerUid, user_id, post }) => {
  const [interestedBuyers, setInterestedBuyers] = useState([]); // 구매 희망 구매자 리스트
  const [activeChat, setActiveChat] = useState(null); // 현재 활성화된 채팅 ID

  const [messages, setMessages] = useState([]); // 메시지 리스트

  const [inputMessage, setInputMessage] = useState(""); // 입력된 메시지
  const [selectedBuyer, setSelectedBuyer] = useState(null); // 구매 확정자 / 확정된 구매자 ID 저장
  const [isPurchased, setIsPurchased] = useState(false); // 구매 확정 여부
  const [isBuyerConfirmed, setIsBuyerConfirmed] = useState(false); // 구매 확정 버튼 활성화 여부
  const [newPost, setNewPost] = useState(null); // 판매자 정보
  const [showSReviewPopup, setShowSReviewPopup] = useState(false); //  판매자 작성 리뷰
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("없으면 안돼 : " + post?.id);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!post?.id) return; // post가 없으면 실행하지 않음
      try {
        const response = await fetch(
          `http://localhost:18090/api/gogumapost/${post.id}`
        );
        const data = await response.json();
        console.log("불러온 게시글 데이터:", data); // 디버깅용 로그 추가
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
          userList: data.user_list,
          reportCnt: data.report_cnt,
          updateTime: data.upd_date,
          seller: data.nickname,
          thumbnail: data.thumbnail,
          userRate: data.user_rate,
        });
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

  console.log("🧐 newPost 초기값:", newPost);
  console.log("🧐 user 초기값:", user);

  useEffect(() => {
    console.log("🚀 useEffect 실행됨! newPost:", newPost, "user:", user);

    if (!newPost || !user) {
      console.log("⛔ newPost 또는 user가 존재하지 않음");
      return;
    }

    console.log("✅ newPost와 user가 존재함!");

    if (
      newPost?.userList.find((buyer) => {
        return user?.uid === buyer;
      })
    ) {
      setInterestedBuyers([
        {
          id: user.uid,
          name: user.nickname,
        },
      ]);
    }

    console.log("내가 받은 구매희망 리스트 : " + interestedBuyers);

    const fetchChatData = async () => {
      try {
        const response = await fetch(
          `http://localhost:18090/api/gogumachat/${newPost?.id}`
        );
        const data = await response.json();
        setMessages(
          data.map((chat) => ({
            cid: chat.cid,
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

    console.log("현재 구매희망 유저 리스트: ", interestedBuyers);

    newPost.userList = interestedBuyers.map((buyer) => buyer.id);

    try {
      const response = await fetch("http://localhost:18090/api/gogumapost", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
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

    // const newBuyerId = "buyer" + Math.floor(Math.random() * 10000); // 랜덤 ID 생성
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
    setMessages([]); // 새로운 채팅 시작 시 메시지 초기화
  };

  // 메시지 전송 함수
  const handleSendMessage = (isSeller) => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      cid: messages.length + 1, // 채팅 ID (새로운 메시지마다 증가)
      pid: newPost?.pid, // 게시글 ID (해당 게시글 ID 사용)
      writer_uid: user.id,
      buyer_uid: isSeller ? user.id : selectedBuyer, // 구매자 ID 또는 판매자 ID
      send_uid: isSeller ? user.id : selectedBuyer, // 보낸 메시지 ID
      receive_uid: isSeller ? selectedBuyer : user.id, // 받는 메시지 ID
      chatContent: inputMessage,
      // updateTime: new Date().toLocaleTimeString([], {
      //   hour: "2-digit",
      //   minute: "2-digit",
      // }), // 시간만 반환 (예: "14:32")
      updateTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // 시간만 반환 (예: "14:32")
    };

    setMessages([...messages, newMessage]);
    setInputMessage(""); // 입력창 초기화
  };

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
        {user_id !== newPost?.sellerUid &&
          interestedBuyers.find((buyer) => {
            return buyer.id !== user_id;
          }) && (
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
                              key={msg.cid} // cid로 메시지 고유식별
                              className={`nego-chat-message ${
                                msg.writer_uid === user.id ? "seller" : "buyer"
                              }`}
                            >
                              <img
                                src={
                                  msg.writer_uid === user.id
                                    ? "https://www.w3schools.com/w3images/avatar2.png"
                                    : "https://www.w3schools.com/howto/img_avatar.png"
                                }
                                alt={
                                  msg.writer_uid === user.id
                                    ? "판매자"
                                    : "구매자"
                                }
                                className="nego-profile-img"
                              />
                              <div className="nego-message-container">
                                <div className="nego-message-text">
                                  {msg.chatContent}
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
                            <button onClick={() => handleSendMessage(true)}>
                              판매자 전송
                            </button>
                          )}

                          {/* 현재 사용자가 구매자인 경우 */}
                          {user_id && (
                            <button onClick={() => handleSendMessage(false)}>
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
