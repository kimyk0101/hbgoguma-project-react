import React, { useState, useEffect } from "react";
import "../css/userNegoChat.css";
import SReviewPopup from "../pages/sellerReviewPage.jsx";
import { IoCheckboxOutline } from "react-icons/io5";


const UserNegoChat = ({ product, user }) => {
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
      id: messages.length + 1,
      userImage: isUser1
        ? "https://www.w3schools.com/w3images/avatar2.png" // 판매자 프로필
        : "https://www.w3schools.com/howto/img_avatar.png", // 구매자 프로필
      userName: isUser1 ? "판매자" : "구매자",
      messageText: inputMessage,
      isUser1,
    };

    setMessages([...messages, newMessage]);
    setInputMessage(""); // 입력창 초기화
  };

  return (
    <div>
      {/* 상품 설명 끝난 후, 구매 희망자 리스트를 하단에 위치 */}
      <div className="product-footer">
        {/* 구매자일 경우 "구매 희망" 버튼 표시 */}
        {user.id !== product.seller && (
          <button
            className="interest-button"
            onClick={handleInterest}
            disabled={isBuyerConfirmed || isPurchased} // 거래 완료되거나 구매자가 확정되면 비활성화
          >
            구매 희망
          </button>
        )}
        {user.id !== product.seller && (
          <div className="interested-buyers">
            <h3>구매 희망자</h3>
            <ul>
              {interestedBuyers.length > 0 ? (
                interestedBuyers.map((buyer) => (
                  <li key={buyer.id} className="buyer-item">
                    <span>{buyer.name}</span>

                    {selectedBuyer === buyer.id ? ( // 선택된 구매자만 "거래 확정됨" 표시
                      <span className="confirmed-text">거래 확정됨</span>
                    ) : (
                      <button
                        onClick={() => handleConfirmBuyer(buyer.id)}
                        disabled={isBuyerConfirmed || isPurchased} // 거래 완료되면 비활성화
                        className={
                          isBuyerConfirmed || isPurchased
                            ? "disabled-button"
                            : ""
                        }
                      >거래 확정
                        <IoCheckboxOutline />
                      </button>
                    )}
                    <button onClick={() => handleStartChat(buyer.id)}>
                      {activeChat === buyer.id ? "채팅 닫기" : "채팅 시작"}
                    </button>
                    {activeChat === buyer.id && (
                      <div className="chat-container">
                        <div className="chat-box">
                          {messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`chat-message ${
                                msg.isUser1 ? "seller" : "buyer"
                              }`}
                            >
                              <img
                                src={msg.userImage}
                                alt={msg.userName}
                                className="profile-img"
                              />
                              <div className="message-text">
                                {msg.messageText}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="chat-input">
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
        <div className="purchase-popup">
          <div className="popup-content">
            <h3>거래가 완료되었습니다</h3>
            <button className="confirm-button" onClick={handlePurchaseConfirm}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* 거래 완료 후 리뷰 팝업 자동 표시 */}
      {selectedBuyer && showSReviewPopup && (
        <SReviewPopup
       onClose={handleCloseReviewPopup}
      onSubmit={handleReviewSubmit}
      showPopup={setShowSReviewPopup}
      />
      )}

      {/* 거래 완료 후 상태 표시 */}
      {isPurchased && (
        <div className="purchase-confirmation">
          <h3>거래가 완료되었습니다!</h3>
        </div>
      )}
    </div>
  );
};

export default UserNegoChat;
