import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "../css/userNegoChat.css";
import SReviewPopup from "../pages/sellerReviewPage.jsx";
import { IoCheckboxOutline } from "react-icons/io5";
import spFilled from "../resources/images/sweet-potato-Filled.png"; // 색이 있는 고구마

const UserNegoChat = ({ sellerUid, user_id, post }) => {
  const [interestedBuyers, setInterestedBuyers] = useState(
    post?.user_list || []
  );
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState(
    post?.selectedUser || null
  );
  const [isPurchased, setIsPurchased] = useState(false);
  const [showSReviewPopup, setShowSReviewPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 게시글 데이터 불러오기
  useEffect(() => {
    if (!post?.id) return;

    const fetchPostData = async () => {
      try {
        const response = await fetch(
          `http://localhost:18090/api/gogumapost/${post.id}`
        );
        const data = await response.json();

        const buyers = data.user_list
          ? Object.entries(data.user_list).map(([id, name]) => ({ id, name }))
          : [];
        setInterestedBuyers(buyers);
        setSelectedBuyer(data.selected_user || null);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchPostData();
  }, [post?.id]);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:18090/api/gogumauser/session",
          { credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUser(data);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("로그인 상태 확인 오류:", error);
      }
    };

    checkLoginStatus();
  }, []);

  // 채팅 데이터 불러오기
  useEffect(() => {
    if (!post?.id) return;

    const fetchChatData = async () => {
      try {
        const response = await fetch(
          `http://localhost:18090/api/gogumachat/${post.id}`
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
  }, [post?.id]);

  // 구매 희망 버튼 클릭
  const handleInterest = async () => {
    if (!user || interestedBuyers.some((buyer) => buyer.id === user.uid))
      return;

    const newBuyer = { id: user.uid, name: user.nickname };
    const updatedBuyers = [...interestedBuyers, newBuyer];

    setInterestedBuyers(updatedBuyers);

    try {
      const response = await fetch(
        `http://localhost:18090/api/gogumapost/${post.id}/userList`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            user_list: Object.fromEntries(
              updatedBuyers.map((b) => [b.id, b.name])
            ),
          }),
        }
      );

      if (!response.ok) throw new Error("구매 희망 등록 실패");
      alert("구매 희망 등록 완료");
    } catch (error) {
      console.error("구매 희망 등록 오류:", error);
    }
  };

  // 구매 확정
  const handleConfirmBuyer = async (buyerId) => {
    setSelectedBuyer(buyerId);
    try {
      await fetch(
        `http://localhost:18090/api/gogumapost/${post.id}/confirmBuyer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ selectedUser: buyerId }),
        }
      );
    } catch (error) {
      console.error("구매 확정 오류:", error);
    }
  };

  // 채팅 전송
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user) return;

    const newMessage = {
      pid: post.id,
      writer_uid: user.uid,
      seller_uid: sellerUid,
      buyer_uid: selectedBuyer,
      chat_content: inputMessage,
      updateTime: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    try {
      await fetch("http://localhost:18090/api/gogumachat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newMessage),
      });
    } catch (error) {
      console.error("채팅 메시지 전송 오류:", error);
    }
  };

  return (
    <div>
      <h3>구매 희망자</h3>
      <ul>
        {interestedBuyers.length > 0 ? (
          interestedBuyers.map((buyer) => (
            <li key={buyer.id}>
              <span>{buyer.name}</span>
              {selectedBuyer === buyer.id ? (
                <span>거래 확정됨</span>
              ) : (
                <button onClick={() => handleConfirmBuyer(buyer.id)}>
                  거래 확정
                </button>
              )}
              <button
                onClick={() =>
                  setActiveChat(buyer.id === activeChat ? null : buyer.id)
                }
              >
                {activeChat === buyer.id ? "채팅 닫기" : "채팅 열기"}
              </button>
            </li>
          ))
        ) : (
          <p>구매 희망자가 없습니다.</p>
        )}
      </ul>

      {activeChat && (
        <div>
          <h4>채팅</h4>
          <div>
            {messages.map((msg) => (
              <div key={msg.order_id}>
                <strong>
                  {msg.writer_uid === sellerUid ? "판매자" : "구매자"}:
                </strong>{" "}
                {msg.chat_content}
              </div>
            ))}
          </div>
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>전송</button>
        </div>
      )}
    </div>
  );
};

UserNegoChat.propTypes = {
  sellerUid: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  post: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
};

export default UserNegoChat;
