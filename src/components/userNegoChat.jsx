import React, { useState, useEffect } from "react";
import "../css/userNegoChat.css";
import SReviewPopup from "../pages/sellerReviewPage.jsx";
import { IoCheckboxOutline } from "react-icons/io5";

// 채팅 데이터 종류
// long cid	- 채팅id
// long pid	- 게시글id
// long buyer_uid 	- 구매자id
// long send_uid	- 보낸 메세지id
// long receive_uid	- 받는 메세지id
// string chatContent	- 메세지
// Date updateTime	- 메세지 시간

const UserNegoChat = ({ user, GogumaPost }) => {
  const [interestedBuyers, setInterestedBuyers] = useState([]); // 구매 희망 구매자 리스트
  const [activeChat, setActiveChat] = useState(null); // 현재 활성화된 채팅 ID
  const [messages, setMessages] = useState([]); // 메시지 리스트
  const [inputMessage, setInputMessage] = useState(""); // 입력된 메시지
  const [selectedBuyer, setSelectedBuyer] = useState(null); // 구매 확정자 / 확정된 구매자 ID 저장
  const [isPurchased, setIsPurchased] = useState(false); // 구매 확정 여부
  const [isBuyerConfirmed, setIsBuyerConfirmed] = useState(false); // 구매 확정 버튼 활성화 여부

  const [showSReviewPopup, setShowSReviewPopup] = useState(false); //  판매자 작성 리뷰

  // 구매 희망 버튼 클릭 시
  const handleInterest = () => {
    if (isBuyerConfirmed || isPurchased) {
      return; // 거래가 완료되었거나 구매자가 확정된 경우 버튼 클릭을 막음
    }

    const newBuyerId = "buyer" + Math.floor(Math.random() * 10000); // 랜덤 ID 생성
    if (!interestedBuyers.some((buyer) => buyer.id === newBuyerId)) {
      const newBuyer = {
        id: newBuyerId,
        name: `구매자 ${interestedBuyers.length + 1}`,
      };
      setInterestedBuyers((prevBuyers) => [...prevBuyers, newBuyer]);
    }
  };

  // 구매 확정 버튼 클릭 시
  const handleConfirmBuyer = (buyerId) => {
    setSelectedBuyer(buyerId); // 구매 확정한 사람의 ID 저장
    setIsBuyerConfirmed(true); // 버튼 비활성화 상태로 변경
  };

  // 구매 확정 팝업 확인 버튼
  const handlePurchaseConfirm = () => {
    setIsPurchased(true); // 거래가 완료되면 상태 변경
    setIsBuyerConfirmed(true); // 거래가 완료되면 구매 확정 버튼도 비활성화
    setShowSReviewPopup(true); // 거래 완료 후 리뷰 팝업 띄우기
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
  const handleSendMessage = (isUser1) => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      cid: messages.length + 1, // 채팅 ID (새로운 메시지마다 증가)
      pid: GogumaPost.pid, // 게시글 ID (해당 게시글 ID 사용)
      buyer_uid: isUser1 ? user.id : selectedBuyer, // 구매자 ID 또는 판매자 ID
      send_uid: isUser1 ? user.id : selectedBuyer, // 보낸 메시지 ID
      receive_uid: isUser1 ? selectedBuyer : user.id, // 받는 메시지 ID
      chatContent: inputMessage,
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
        {user.id !== GogumaPost.uid && (
          <button
            className="nego-interest-button"
            onClick={handleInterest}
            disabled={isBuyerConfirmed || isPurchased} // 거래 완료되거나 구매자가 확정되면 비활성화
          >
            구매 희망
          </button>
        )}
        {user.id !== GogumaPost.uid && (
          <div className="nego-interested-buyers">
            <h3>구매 희망자</h3>
            <ul>
              {interestedBuyers.length > 0 ? (
                interestedBuyers.map((buyer) => (
                  <li key={buyer.id} className="nego-buyer-item">
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
                        <IoCheckboxOutline />
                      </button>
                    )}
                    <button onClick={() => handleStartChat(buyer.id)}>
                      {activeChat === buyer.id ? "채팅 닫기" : "채팅 시작"}
                    </button>
                    {activeChat === buyer.id && (
                      <div className="nego-chat-container">
                        <div className="nego-chat-box">
                          {messages.map((msg) => (
                            <div
                              key={msg.cid} // cid로 메시지 고유식별
                              className={`nego-chat-message ${
                                msg.send_uid === user.id ? "seller" : "buyer"
                              }`}
                            >
                              <img
                                src={
                                  msg.send_uid === user.id
                                    ? "https://www.w3schools.com/w3images/avatar2.png"
                                    : "https://www.w3schools.com/howto/img_avatar.png"
                                }
                                alt={
                                  msg.send_uid === user.id ? "판매자" : "구매자"
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
                          <button onClick={() => handleSendMessage(false)}>
                            구매자 전송
                          </button>
                          <button onClick={() => handleSendMessage(true)}>
                            판매자 전송
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
        <>
          <div className="nego-blur-background"></div>
          <SReviewPopup
            onClose={handleCloseReviewPopup}
            onSubmit={handleReviewSubmit}
          />
        </>
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

export default UserNegoChat;
