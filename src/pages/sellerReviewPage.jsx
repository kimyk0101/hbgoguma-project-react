import React, { useState, useEffect } from "react"; 
import { CgCloseR } from "react-icons/cg";  // 사이다 아이콘
import { LuCupSoda } from "react-icons/lu";
import "../css/sellerReviewPage.css";

const SReviewPopup = ({ onClose, onSubmit, showPopup }) => {
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);  // 리뷰 작성 여부

  // 리뷰 작성 여부 체크 (팝업을 다시 띄우지 않도록)
  useEffect(() => {
    showPopup(true);
    }, []); 
  
  
  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      const reviewData = {
        rating,
        content: newReview,
        date: new Date().toLocaleDateString(),
        author: "구매자",
      };

      onSubmit(reviewData);
      localStorage.setItem("hasReviewed", "true"); // 리뷰 작성 여부 저장
      onClose();
    }
  };

  if (isReviewed) return null; // 이미 리뷰를 작성한 경우 팝업을 띄우지 않음

  return (
    <div className="seller-review-container">
      <div className="seller-review-content">
      
      <button className="closePopup-button" onClick={() => {
        onClose();
      }}>
          <CgCloseR />
        </button>
        <h3>리뷰를 작성해주세요</h3>

        {/* 평점 선택 */}
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map((bottle) => (
            <span
              key={bottle}
              className={bottle <= rating ? "bottle selected" : "bottle"}
              onClick={() => setRating(bottle)}
            >
              <LuCupSoda />
            </span>
          ))}
        </div>

        {/* 리뷰 입력 */}
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="구매자에 대한 리뷰를 작성하세요..."
          className="review-input"
        />

        <button onClick={() => {handleReviewSubmit(); onClose();}} className="confirm-button">
          확인
        </button>
      </div>
    </div>
  );
};

export default SReviewPopup;

