// @TODO - 상품 상세 페이지 구현
import React from "react";

const ProductDetailPage = ({ product, onBack }) => {
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className="detail-container">
      <button onClick={onBack} className="back-button">
        ← 뒤로가기
      </button>
      <img src={product.image} alt={product.title} className="detail-image" />
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="price">{product.price}</p>
        <p className="seller">판매자: {product.seller}</p>
        <p className="category">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
