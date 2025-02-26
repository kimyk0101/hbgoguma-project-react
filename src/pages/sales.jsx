import React, { useState } from "react";
import "../css/sellProductPage.css";
import Header from "../components/header";
import Advertise from "../components/advertise";
import Footer from "../components/footer";

const allDongs = {
  강남구: [
    "개포1동",
    "개포2동",
    "개포3동",
    "개포4동",
    "논현1동",
    "논현2동",
    "대치1동",
    "대치2동",
    "대치4동",
    "삼성1동",
    "삼성2동",
    "도곡1동",
    "도곡2동",
    "세곡동",
    "수서동",
    "신사동",
    "압구정동",
    "역삼1동",
    "역삼2동",
    "일원동",
    "일원본동",
    "청담동",
  ],
  서초구: [
    "내곡동",
    "방배1동",
    "방배2동",
    "방배3동",
    "방배4동",
    "방배본동",
    "서초1동",
    "서초2동",
    "서초3동",
    "서초4동",
    "반포동",
    "양재1동",
    "양재2동",
    "잠원동",
  ],
};

const categories = [
  "전체",
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
  "반료동물",
  "티켓/교환권",
  "도서",
  "기타",
];

const dongs = [
  [1, "개포1동"],
  [2, "개포2동"],
  [3, "개포3동"],
  [4, "개포4동"],
  [5, "논현1동"],
  [6, "논현2동"],
  [7, "대치1동"],
  [8, "대치2동"],
  [9, "대치4동"],
  [10, "도곡1동"],
  [11, "도곡2동"],
  [12, "삼성1동"],
  [13, "삼성2동"],
  [14, "세곡동"],
  [15, "수서동"],
  [16, "신사동"],
  [17, "압구정동"],
  [18, "역삼1동"],
  [19, "역삼2동"],
  [20, "일원1동"],
  [21, "일원본동"],
  [22, "청담동"],
  [23, "내곡동"],
  [24, "반포1동"],
  [25, "반포2동"],
  [26, "반포3동"],
  [27, "반포4동"],
  [28, "반포본동"],
  [29, "방배1동"],
  [30, "방배2동"],
  [31, "방배3동"],
  [32, "방배4동"],
  [33, "방배본동"],
  [34, "서초1동"],
  [35, "서초2동"],
  [36, "서초3동"],
  [37, "서초4동"],
  [38, "양재1동"],
  [39, "양재2동"],
  [40, "잠원동"],
];

const CATEGORY_ID = [
  [1, "디지털기기"],
  [2, "가구/인테리어"],
  [3, "유아동"],
  [4, "의류"],
  [5, "잡화"],
  [6, "생활가전"],
  [7, "생활/주방"],
  [8, "스포츠/레저"],
  [9, "취미/게임/음반"],
  [10, "뷰티/미용"],
  [11, "식물"],
  [12, "식품"],
  [13, "반려동물"],
  [14, "티켓/교환권"],
  [15, "도서"],
  [16, "기타"],
];

const regions = ["강남구", "서초구"];

const SellProductPage = ({ onSubmitSuccess }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("디지털기기");
  const [regionGu, setRegionGu] = useState("강남구");
  const [regionDong, setRegionDong] = useState("개포1동");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await fetch(`http://localhost:18090/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();
        setImageUrl(uploadResult.url); // 업로드된 이미지 URL 저장
        setPreview(uploadResult.url); // 미리보기 업데이트
      } else {
        alert("이미지 업로드 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryId =
      CATEGORY_ID.find(([id, name]) => name === category)?.[0] || "1";
    const locaGuId = regions.indexOf(regionGu) + 1;
    const locaDongId =
      dongs.find(([id, name]) => name === regionDong)?.[0] || "1";

    //가상이미지
    const imageUrl =
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20130403_48%2Fsakuralllll_1364973975884Xvyp1_JPEG%2F1364881929188.jpg&type=a340";
    const pid = 1001; // 가상의 상품 ID
    const uid = 123; // 가상의 사용자 ID
    const nickname = "판매자123"; // 가상의 닉네임
    const postUpdate = new Date().toISOString(); // 현재 시간
    const selected_uid = 0;
    const report_cnt = 100;
    const priceNumber = Number(price);
    const postData = {
      selected_uid,
      report_cnt,
      pid,
      uid,
      nickname,
      post_title: title,
      post_price: priceNumber,
      post_category: categoryId,
      loca_gu: locaGuId,
      loca_dong: locaDongId,
      post_content: description,
      post_update: postUpdate,
      post_photo: imageUrl, // URL로 저장
      user_list: [],
    };
    console.log(postData);
    try {
      const response = await fetch(`http://localhost:18090/api/gogumapost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("게시물이 성공적으로 등록되었습니다!");
        onSubmitSuccess();
      } else {
        alert("게시물 등록 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("게시물 등록 중 오류 발생:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Header />
      <Advertise />
      <div className="sell-product-container">
        <h2>판매 상품 등록</h2>
        <form onSubmit={handleSubmit}>
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
          <br />
          <div className="sell-product-row">
            <label>카테고리:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORY_ID.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <label>지역(구):</label>
            <select
              value={regionGu}
              onChange={(e) => setRegionGu(e.target.value)}
            >
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>

            <label>동:</label>
            <select
              value={regionDong}
              onChange={(e) => setRegionDong(e.target.value)}
            >
              {allDongs[regionGu].map((dong, index) => (
                <option key={dong} value={index + 1}>
                  {dong}
                </option>
              ))}
            </select>
          </div>

          <label className="sellProductDetail">설명:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="sellProductImage">이미지 업로드:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div className="sellProductImageView">
            {preview && (
              <img src={preview} alt="미리보기" className="image-preview" />
            )}
          </div>

          <button type="submit">등록</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SellProductPage;
