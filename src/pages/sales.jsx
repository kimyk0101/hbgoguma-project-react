import React, { useState } from "react";
import "../css/sellProductPage.css";
import Header from "../components/header";
import Advertise from "../components/advertise";
import Footer from "../components/footer";

const categories = [
  "디지털기기",
  "가구/인테리어",
  "유아동",
  "의류",
  "잡화",
  "생활가전",
  "생활/주방",
  "스포츠/레저",
  "취미/게임/음반",
  "뷰티/미용",
  "식물",
  "식품",
  "반려동물",
  "티켓/교환권",
  "도서",
  "기타",
];

const regions = ["강남구", "서초구"];

const SellProductPage = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [region, setRegion] = useState(regions[0]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("region", region);
    formData.append("description", description);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <>
      <Header />
      <Advertise />
      <div className="sell-product-container">
        <h2>판매 상품 등록</h2>
        <form onSubmit={handleSubmit}>
          {/* 상품명 & 가격 같은 줄 */}
          <div className="sell-product-row">
            <label>상품명:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>가격:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* 카테고리 & 지역 같은 줄 */}
          <div className="sell-product-row">
            <label>카테고리:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label>지역:</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* 설명 */}
          <label className="sellProductDetail">설명:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* 이미지 업로드 */}
          <label className="sellProductImage">이미지 업로드:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {/* 미리보기 */}
          <div className="sellProductImageView">
            {preview && (
              <img src={preview} alt="미리보기" className="image-preview" />
            )}
          </div>

          {/* 등록 버튼 */}
          <button type="submit">등록</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SellProductPage;
