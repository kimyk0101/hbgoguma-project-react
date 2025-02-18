import React, { useState } from "react";
import "../css/sellerReviewPage.css";

const SellerReviewPage = ({ sellerId }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "사용자1",
      rating: 5,
      content: "정말 친절한 판매자였습니다!",
      date: "2025-02-18",
    },
    {
      id: 2,
      author: "사용자2",
      rating: 4,
      content: "응답이 빨라서 좋았어요.",
      date: "2025-02-17",
    },
  ]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleReviewSubmit = () => {
    if (newReview.trim() === "") return;
    const newReviewObj = {
      id: reviews.length + 1,
      author: "사용자", // 로그인 시스템이 없으므로 임시 이름 사용
      rating,
      content: newReview,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([newReviewObj, ...reviews]); // 최신순 정렬
    setNewReview("");
    setRating(5);
  };

  return (
    <div className="seller-review-container">
      <h3>판매자 리뷰</h3>
      <div className="rating-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star selected" : "star"}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="판매자에 대한 리뷰를 작성하세요..."
        className="review-input"
      />
      <button onClick={handleReviewSubmit} className="submit-button">
        리뷰 등록
      </button>
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            <p>
              <strong>{review.author}</strong> ({review.date})
            </p>
            <p className="review-rating">평점: {"★".repeat(review.rating)}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerReviewPage;
