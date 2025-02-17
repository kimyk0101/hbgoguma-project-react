import React, { useState } from "react";
import "../css/productListPage.css";

const categories = ["전체", "전자기기", "의류", "도서", "가구", "기타"];

const products = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    title: "상품 1",
    price: "₩10,000",
    seller: "사용자1",
    category: "전자기기",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "상품 2",
    price: "₩20,000",
    seller: "사용자2",
    category: "의류",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "상품 3",
    price: "₩15,000",
    seller: "사용자3",
    category: "도서",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150",
    title: "상품 4",
    price: "₩30,000",
    seller: "사용자4",
    category: "가구",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/150",
    title: "상품 5",
    price: "₩50,000",
    seller: "사용자5",
    category: "기타",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/150",
    title: "상품 6",
    price: "₩5,000",
    seller: "사용자6",
    category: "전자기기",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/150",
    title: "상품 7",
    price: "₩8,000",
    seller: "사용자7",
    category: "의류",
  },
  {
    id: 8,
    image: "https://via.placeholder.com/150",
    title: "상품 8",
    price: "₩12,000",
    seller: "사용자8",
    category: "도서",
  },
  {
    id: 9,
    image: "https://via.placeholder.com/150",
    title: "상품 9",
    price: "₩40,000",
    seller: "사용자9",
    category: "가구",
  },
  {
    id: 10,
    image: "https://via.placeholder.com/150",
    title: "상품 10",
    price: "₩22,000",
    seller: "사용자10",
    category: "기타",
  },
  {
    id: 11,
    image: "https://via.placeholder.com/150",
    title: "상품 11",
    price: "₩9,000",
    seller: "사용자11",
    category: "전자기기",
  },
  {
    id: 12,
    image: "https://via.placeholder.com/150",
    title: "상품 12",
    price: "₩18,000",
    seller: "사용자12",
    category: "의류",
  },
  {
    id: 13,
    image: "https://via.placeholder.com/150",
    title: "상품 13",
    price: "₩18,000",
    seller: "사용자13",
    category: "의류",
  },
];

const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredProducts = products.filter(
    (product) =>
      product.title.includes(searchTerm) &&
      (selectedCategory === "전체" || product.category === selectedCategory)
  );

  return (
    <div className="container">
      {/* 검색창 */}
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="content">
        {/* 카테고리 필터 */}
        <aside className="sidebar">
          <h3>카테고리</h3>
          {categories.map((category) => (
            <label key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
              />
              {category}
            </label>
          ))}
        </aside>

        {/* 상품 리스트 */}
        <section className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p className="price">{product.price}</p>
              <p className="seller">판매자: {product.seller}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProductListPage;
