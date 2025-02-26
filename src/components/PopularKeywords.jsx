import React from "react";
// import "../css/popularKeywords.css";

const PopularKeywords = ({ onKeywordClick }) => {
  const popularKeywords = [
    "아이폰",
    "노트북",
    "삼성",
    "에어팟",
    "갤럭시",
    "닌텐도",
    "다이소",
    "레고",
    "패딩",
    "자전거",
  ];

  return (
    <div className="popular-keywords">
      <p>인기 검색어</p>
      {popularKeywords.map((keyword) => (
        <button
          key={keyword}
          className="keyword-btn"
          onClick={() => onKeywordClick(keyword)}
        >
          {keyword}
        </button>
      ))}
    </div>
  );
};

export default PopularKeywords;
