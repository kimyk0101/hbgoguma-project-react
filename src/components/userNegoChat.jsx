import React, { useState } from "react";
import "../css/userNegoChat.css";

const UserNegoChat = ({ buyerId, selectedBuyer }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      userImage: "https://www.w3schools.com/w3images/avatar2.png",
      userName: "판매자",
      messageText: "안녕하세요! 궁금한 점이 있으시면 말씀해 주세요.",
      isUser1: true, // 판매자 메시지
    },
    {
      id: 2,
      userImage: "https://www.w3schools.com/howto/img_avatar.png",
      userName: "구매자",
      messageText: "안녕하세요! 이거 아직 판매 중인가요?",
      isUser1: false, // 구매자 메시지
    },
    {
      id: 3,
      userImage: "https://www.w3schools.com/w3images/avatar2.png",
      userName: "판매자",
      messageText: "네! 아직 판매 중이에요!",
      isUser1: true, // 판매자 메시지
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  // 메시지 전송 함수
  const handleSendMessage = (isUser1) => {
    if (inputMessage.trim() === "") return;

    // 메시지 추가
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
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.isUser1 ? "seller" : "buyer"}`}
          >
            <img src={msg.userImage} alt={msg.userName} className="profile-img" />
            <div className="message-text">{msg.messageText}</div>
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
  );
};

export default UserNegoChat;
