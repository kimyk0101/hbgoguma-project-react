import React, { useState } from "react";
import "../css/productDetailPage.css";
import UserNegoChat from "../components/userNegoChat.jsx"; // 채팅 컴포넌트 임포트

const ProductDetailPage = ({ onBack }) => {
  const [interestedBuyers, setInterestedBuyers] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // 현재 활성화된 채팅 ID

  // TODO: 임의의 데이터 바꾸기
  const product = {
    image: "../images/iphone14.png",
    title: "아이폰 14",
    description: "아이폰 14 팔아요",
    seller: "판매자",
    location: "역삼동",
    category: "전자기기",
    views: 1,
  };

  const user = { id: "buyer123" }; // 현재 로그인한 사용자 (판매자가 아니라면 구매자로 간주)

  // 관심 구매자 추가 (구매 희망 버튼 클릭 시 실행)
  const handleInterest = () => {
    const newBuyerId = "buyer" + Math.floor(Math.random() * 10000); // 랜덤 ID 생성

    console.log("✅ 구매 희망 버튼 클릭됨!");

    if (!interestedBuyers.some((buyer) => buyer.id === newBuyerId)) {
      const newBuyer = { id: newBuyerId, name: `구매자 ${interestedBuyers.length + 1}` };
      setInterestedBuyers((prevBuyers) => [...prevBuyers, newBuyer]);
      console.log("🔹 새로운 구매자 추가됨:", newBuyer);
    } else {
      console.log("⚠ 이미 존재하는 구매자입니다.");
    }
  };

  // 채팅 시작 버튼 클릭 시 활성화/비활성화 토글
  const handleStartChat = (buyerId) => {
    console.log("🗨 채팅 버튼 클릭됨! 구매자 ID:", buyerId);
    setActiveChat((prevActiveChat) => (prevActiveChat === buyerId ? null : buyerId));
  };

  return (
    <div>
      {/* 뒤로가기 버튼 */}
      <button onClick={onBack} className="back-button">
        ← 뒤로가기
      </button>

      <div className="product-detail">
        <div className="product-left">
          <img src={product.image} alt={product.title} className="product-image" />
          <div className="seller-info">
            <p>판매자: {product.seller}</p>
            <p>거래 희망 지역: {product.location}</p>
            <p>카테고리: {product.category}</p>
            <p>조회수: {product.views}</p>
          </div>
        </div>

        <div className="product-right">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>

          {/* 구매자일 경우 "구매 희망" 버튼 표시 */}
          {user.id !== product.seller && (
  <button className="interest-button" onClick={handleInterest}>
    구매 희망
  </button>
)}

{user.id === product.seller && (
  <div className="interested-buyers">
    <h3>구매 희망자</h3>
    <ul>
      {interestedBuyers.length > 0 ? (
        interestedBuyers.map((buyer) => (
          <li key={buyer.id} className="buyer-item">
            <span>{buyer.name}</span>
            <button onClick={() => handleStartChat(buyer.id)}>
              {activeChat === buyer.id ? "채팅 닫기" : "채팅 시작"}
            </button>
            {activeChat === buyer.id && <UserNegoChat buyerId={buyer.id} />}
          </li>
        ))
      ) : (
        <p>아직 구매 희망자가 없습니다.</p>
      )}
    </ul>
  </div>
)}

          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
