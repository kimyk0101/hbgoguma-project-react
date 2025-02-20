import React, { useEffect, useState } from "react";
import "../css/productListPage.css";

const regions = ["전체", "강남구", "서초구"];
const allDongs = {
  강남구: ["개포1동", "개포2동", "개포3동", "개포4동", "논현1동", "논현2동", "대치1동", "대치2동", "대치4동", "삼성1동", "삼성2동", "도곡1동", "도곡2동", "세곡동", "수서동", "신사동", "압구정동", "역삼1동", "역삼2동", "일원동", "일원본동", "청담동",],
  서초구: ["내곡동", "방배1동", "방배2동", "방배3동", "방배4동", "방배본동", "서초1동","서초2동", "서초3동", "서초4동", "반포동", "양재1동", "양재2동", "잠원동"],
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
const dongs = {
  0: "개포1동",
    1: "개포2동",
    2: "개포3동",
    3: "개포4동",
    4: "논현1동",
    5: "논현2동",
    6: "대치1동",
    7: "대치2동",
    8: "대치4동",
    9: "도곡1동",
    10: "도곡2동",
    11: "삼성1동",
    12: "삼성2동",
    13: "세곡동",
    14: "수서동",
    15: "신사동",
    16: "압구정동",
    17: "역삼1동",
    18: "역삼2동",
    19: "일원1동",
    20: "일원본동",
    21: "청담동",
    22: "내곡동",
    23: "반포1동",
    24: "반포2동",
    25: "반포3동",
    26: "반포4동",
    27: "반포본동",
    28: "방배1동",
    29: "방배2동",
    30: "방배3동",
    31: "방배4동",
    32: "방배본동",
    33: "서초1동",
    34: "서초2동",
    35: "서초3동",
    36: "서초4동",
    37: "양재1동",
    38: "양재2동",
    39: "잠원동",
};

const CATEGORY_ID = {
  0: "디지털기기",
  1: "가구/인테리어",
  2: "유아동",
  3: "의류",
  4: "잡화",
  5: "생활가전",
  6: "생활/주방",
  7: "스포츠/레저",
  8: "취미/게임/음반",
  9: "뷰티/미용",
  10: "식물",
  11: "식품",
  12: "반려동물",
  13: "티켓/교환권",
  14: "도서",
  15: "기타",
};

const GogumaPost = {
  pid: 1, //  게시글 번호
  uid: 1, //  작성자 id
  selectedUid: 2, //  구매확정자 id
  locaGu: 1,
  locaDong: 1,
  postTitle: "아이폰 14 팝니다",
  postPhoto: "../resources/images/iphone14.png",
  postContent: "아이폰 14 싸게 팔아요1111111111111",
  postCategory: 0,
  reportCnt: 0, //  해당 게시글 신고 횟수
  postUpdate: "2025-02-19",
};

const products = [
  {
    pid: 1, //  게시글 번호
    uid: 1, //  작성자 id
    selectedUid: 2, //  구매확정자 id
    locaGu: 1,
    locaDong: 1,
    price: 1200000,
    postTitle: "아이폰 14 팝니다",
    postPhoto: "../resources/images/iphone14.png",
    postContent: "아이폰 14 싸게 팔아요1111111111111",
    postCategory: CATEGORY_ID[1],
    reportCnt: 0, //  해당 게시글 신고 횟수
    postUpdate: "2025-02-19",
  },

  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "상품 2",
    price: "₩20,000",
    seller: "사용자2",
    region: "강남구",
    category: CATEGORY_ID[1],
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "상품 3",
    price: "₩15,000",
    seller: "사용자3",
    region: "강남구",
    category: CATEGORY_ID[1],
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150",
    title: "상품 4",
    price: "₩30,000",
    seller: "사용자4",
    region: "강남구",
    category: CATEGORY_ID[2],
  },
  {
    id: 5,
    image: "https://via.placeholder.com/150",
    title: "상품 5",
    price: "₩50,000",
    seller: "사용자5",
    region: "강남구",
    category: CATEGORY_ID[0],
  },
  {
    id: 6,
    image: "https://via.placeholder.com/150",
    title: "상품 6",
    price: "₩5,000",
    seller: "사용자6",
    region: "강남구",
    category: CATEGORY_ID[3],
  },
  {
    id: 7,
    image: "https://via.placeholder.com/150",
    title: "상품 7",
    price: "₩8,000",
    seller: "사용자7",
    region: "서초구",
    category: CATEGORY_ID[4],
  },
  {
    id: 8,
    image: "https://via.placeholder.com/150",
    title: "상품 8",
    price: "₩12,000",
    seller: "사용자8",
    region: "서초구",
    category: CATEGORY_ID[5],
  },
  {
    id: 9,
    image: "https://via.placeholder.com/150",
    title: "상품 9",
    price: "₩40,000",
    seller: "사용자9",
    region: "서초구",
    category: CATEGORY_ID[6],
  },
  {
    id: 10,
    image: "https://via.placeholder.com/150",
    title: "상품 10",
    price: "₩22,000",
    seller: "사용자10",
    region: "서초구",
    category: CATEGORY_ID[7],
  },
  {
    id: 11,
    image: "https://via.placeholder.com/150",
    title: "상품 11",
    price: "₩9,000",
    seller: "사용자11",
    region: "서초구",
    category: CATEGORY_ID[0],
  },
  {
    id: 12,
    image: "https://via.placeholder.com/150",
    title: "상품 12",
    price: "₩18,000",
    seller: "사용자12",
    region: "서초구",
    category: CATEGORY_ID[0],
  },
  {
    id: 13,
    image: "https://via.placeholder.com/150",
    title: "상품 13",
    price: "₩18,000",
    seller: "사용자13",
    region: "서초구",
    category: CATEGORY_ID[9],
  },
];

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

const ITEMS_PER_PAGE = 12;

const ProductListPage = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedDong, setSelectedDong] = useState("전체");
  const filteredDongs = selectedRegion === "전체" ? [] : allDongs[selectedRegion] || [];
  const filteredProducts = products.filter(
    (product) =>
      (selectedRegion === "전체" || product.region === selectedRegion) &&
      (selectedDong === "전체" || product.dong === selectedDong) &&
      (selectedCategory === "전체" || product.category === selectedCategory) &&
      product.title.includes(searchTerm)
  );


  const [currentPage, setCurrentPage] = useState(1);

  //서버에서 데이터 가져오기
  useEffect(() => {
    fetch("http://localhost:18090/api/gogumapost") // 여기에 실제 API 입력
      .then((response) => response.json())
      .then((data) => {
        const mappedData = data.map((item) => ({
          id: pid, // 서버에서 받은 상품 ID
          title: postTitle, // 제목
          price: price || "가격 미정", // 가격 (백엔드에 따라 수정)
          category: item.postCategory, // 카테고리
          region: locaGu, // 지역 (구 정보만 사용)
          image: postPhoto, // 상품 이미지
          seller: uid, // 판매자 UID
        }));
        setProducts(mappedData);
      })
      .catch((error) => console.error("데이터 불러오기 실패:", error));
  }, []);



  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

//인기 검색어 클릭 시 검색창에 입력 후 자동 검색
const handlePopularKeywordClick = (keyword) => {
  setSearchTerm(keyword);
};

  return (
    <div className="Listcontainer">
      {/* 검색창 */}
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="Listsearch-input"
      />
      {/* 인기검색어 */}
 <div className="Listpopular-keywords">
<p>인기 검색어</p>
{popularKeywords.map((keyword) => (
  <button
    key={keyword}
    className="Listkeyword-btn"
    onClick={() => handlePopularKeywordClick(keyword)}
  >
    {keyword}
  </button>
))}
</div> 

      <div className="Listcontent">
        {/* 카테고리 필터 */}
        <aside className="Listsidebar">
              <h3>지역 선택</h3>
{regions.map((region) => (
  <label key={region}>
    <input
      type="radio"
      name="region"
      value={region}
      checked={selectedRegion === region}
      onChange={() => {
        setSelectedRegion(region);
        setSelectedDong("전체"); // 지역 변경 시 동 초기화
      }}
    />
    {region}
  </label>
))}

{selectedRegion !== "전체" && (
  <>
<select
value={selectedDong}
onChange={(e) => setSelectedDong(e.target.value)}
>
<option value="전체">-- 동 선택 --</option>
{filteredDongs.map((dong, index) => (
<option key={index} value={dong}>
{dong}
</option>
))}
</select>

  </>
)}
          <h3>카테고리</h3>
          {categories.map((category) => (
            <label key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
              />
              {category}
            </label>
          ))}
        </aside>

        {/* 상품 리스트 */}
        <section className="Listproduct-list">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => onSelectProduct(product)}
              style={{ cursor: "pointer" }}
            >
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p className="Listprice">{product.price}</p>
              <p className="Listseller">판매자: {product.seller}</p>
              <p className="Listregion">{product.region}</p>
              <p className="Listcategory">{product.category}</p>
            </div>
          ))}
        </section>
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="Listpagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          다음
        </button>
       
          <button className="Listcreate">게시물 작성</button>
        
      </div>
        
    </div>
  );
};

export default ProductListPage;

// import React, { useState } from "react";
// import "../css/productListPage.css";
// const regions = ["전체", "강남구", "서초구"];
// const allDongs = {
//   강남구: ["개포1동", "개포2동", "개포3동", "개포4동", "논현1동", "논현2동", "대치1동", "대치2동", "대치4동", "삼성1동", "삼성2동", "도곡1동", "도곡2동", "세곡동", "수서동", "신사동", "압구정동", "역삼1동", "역삼2동", "일원동", "일원본동", "청담동",],
//   서초구: ["내곡동", "방배1동", "방배2동", "방배3동", "방배4동", "방배본동", "서초1동","서초2동", "서초3동", "서초4동", "반포동", "양재1동", "양재2동", "잠원동"],
// };

// const dongs = {
//   0: "개포1동",
//     1: "개포2동",
//     2: "개포3동",
//     3: "개포4동",
//     4: "논현1동",
//     5: "논현2동",
//     6: "대치1동",
//     7: "대치2동",
//     8: "대치4동",
//     9: "도곡1동",
//     10: "도곡2동",
//     11: "삼성1동",
//     12: "삼성2동",
//     13: "세곡동",
//     14: "수서동",
//     15: "신사동",
//     16: "압구정동",
//     17: "역삼1동",
//     18: "역삼2동",
//     19: "일원1동",
//     20: "일원본동",
//     21: "청담동",
//     22: "내곡동",
//     23: "반포1동",
//     24: "반포2동",
//     25: "반포3동",
//     26: "반포4동",
//     27: "반포본동",
//     28: "방배1동",
//     29: "방배2동",
//     30: "방배3동",
//     31: "방배4동",
//     32: "방배본동",
//     33: "서초1동",
//     34: "서초2동",
//     35: "서초3동",
//     36: "서초4동",
//     37: "양재1동",
//     38: "양재2동",
//     39: "잠원동",
// };
// const categories = [
//   "전체",
//   "디지털기기",
//   "가구/인테리어",
//   "유아동",
//   "의류",
//   "잡화",
//   "생활가전",
//   "생활/주방",
//   "스포츠/레저",
//   "취미/게임/음반",
//   "뷰티/미용",
//   "식물",
//   "식품",
//   "반료동물",
//   "티켓/교환권",
//   "도서",
//   "기타",
// ];
// const CATEGORY_ID = {
//   0: "디지털기기",
//   1: "가구/인테리어",
//   2: "유아동",
//   3: "의류",
//   4: "잡화",
//   5: "생활가전",
//   6: "생활/주방",
//   7: "스포츠/레저",
//   8: "취미/게임/음반",
//   9: "뷰티/미용",
//   10: "식물",
//   11: "식품",
//   12: "반려동물",
//   13: "티켓/교환권",
//   14: "도서",
//   15: "기타",
// };
// const products = [
//   {
//     id: 1,
//     image: "../resources/images/iphone14.png",
//     title: "아이폰14",
//     price: 1200000,
//     seller: 1, //USER_ID
//     region: 1,
//     category: CATEGORY_ID[0],
//   },
//   {
//     id: 2,
//     image: "https://via.placeholder.com/150",
//     title: "상품 2",
//     price: "₩20,000",
//     seller: "사용자2",
//     region: "강남구",
//     dong: "역삼동",
//     category: CATEGORY_ID[1],
//   },
//   {
//     id: 3,
//     image: "https://via.placeholder.com/150",
//     title: "상품 3",
//     price: "₩15,000",
//     seller: "사용자3",
//     region: "강남구",
//     category: CATEGORY_ID[1],
//   },
//   {
//     id: 4,
//     image: "https://via.placeholder.com/150",
//     title: "상품 4",
//     price: "₩30,000",
//     seller: "사용자4",
//     region: "강남구",
//     category: CATEGORY_ID[2],
//   },
//   {
//     id: 5,
//     image: "https://via.placeholder.com/150",
//     title: "상품 5",
//     price: "₩50,000",
//     seller: "사용자5",
//     region: "강남구",
//     category: CATEGORY_ID[0],
//   },
//   {
//     id: 6,
//     image: "https://via.placeholder.com/150",
//     title: "상품 6",
//     price: "₩5,000",
//     seller: "사용자6",
//     region: "강남구",
//     category: CATEGORY_ID[3],
//   },
//   {
//     id: 7,
//     image: "https://via.placeholder.com/150",
//     title: "상품 7",
//     price: "₩8,000",
//     seller: "사용자7",
//     region: "서초구",
//     category: CATEGORY_ID[4],
//   },
//   {
//     id: 8,
//     image: "https://via.placeholder.com/150",
//     title: "상품 8",
//     price: "₩12,000",
//     seller: "사용자8",
//     region: "서초구",
//     category: CATEGORY_ID[5],
//   },
//   {
//     id: 9,
//     image: "https://via.placeholder.com/150",
//     title: "상품 9",
//     price: "₩40,000",
//     seller: "사용자9",
//     region: "서초구",
//     category: CATEGORY_ID[6],
//   },
//   {
//     id: 10,
//     image: "https://via.placeholder.com/150",
//     title: "상품 10",
//     price: "₩22,000",
//     seller: "사용자10",
//     region: "서초구",
//     category: CATEGORY_ID[7],
//   },
//   {
//     id: 11,
//     image: "https://via.placeholder.com/150",
//     title: "상품 11",
//     price: "₩9,000",
//     seller: "사용자11",
//     region: "서초구",
//     category: CATEGORY_ID[0],
//   },
//   {
//     id: 12,
//     image: "https://via.placeholder.com/150",
//     title: "상품 12",
//     price: "₩18,000",
//     seller: "사용자12",
//     region: "서초구",
//     category: CATEGORY_ID[0],
//   },
//   {
//     id: 13,
//     image: "https://via.placeholder.com/150",
//     title: "상품 13",
//     price: "₩18,000",
//     seller: "사용자13",
//     region: "서초구",
//     category: CATEGORY_ID[9],
//   },
// ];
// const popularKeywords = [
//   "아이폰",
//   "노트북",
//   "삼성",
//   "에어팟",
//   "갤럭시",
//   "닌텐도",
// ];

// const ITEMS_PER_PAGE = 12;
// const ProductListPage = ({ onSelectProduct }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("전체");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRegion, setSelectedRegion] = useState("전체");
//   const [selectedDong, setSelectedDong] = useState("전체");
//   const filteredDongs = selectedRegion === "전체" ? [] : allDongs[selectedRegion] || [];
//   const filteredProducts = products.filter(
//     (product) =>
//       (selectedRegion === "전체" || product.region === selectedRegion) &&
//       (selectedDong === "전체" || product.dong === selectedDong) &&
//       (selectedCategory === "전체" || product.category === selectedCategory) &&
//       product.title.includes(searchTerm)
//   );
//   const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const displayedProducts = filteredProducts.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );
//   // 상품 클릭 시 상세 페이지 이동
//   const goToDetailPage = (productId) => {
//     window.location.href = `/productDetail.html?id=${productId}`;
//   };

//   // 인기 검색어 클릭 시 검색창에 입력 후 자동 검색
//   const handlePopularKeywordClick = (keyword) => {
//     setSearchTerm(keyword);
//   };
//   return (
//     <div className="Listcontainer">
//       {/* 검색창 */}
//       <input
//         type="text"
//         placeholder="검색어를 입력하세요..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="Listsearch-input"
//       />
//       {/* 인기 검색어 목록 */}
//       <div className="Listpopular-keywords">
//         <p>인기 검색어</p>
//         {popularKeywords.map((keyword) => (
//           <button
//             key={keyword}
//             className="Listkeyword-btn"
//             onClick={() => handlePopularKeywordClick(keyword)}
//           >
//             {keyword}
//           </button>
//         ))}
//       </div>

//       <div className="Listcontent">
//         {/* 카테고리 필터 */}
//         <aside className="Listsidebar">
//            <h3>지역 선택</h3>
//         {regions.map((region) => (
//           <label key={region}>
//             <input
//               type="radio"
//               name="region"
//               value={region}
//               checked={selectedRegion === region}
//               onChange={() => {
//                 setSelectedRegion(region);
//                 setSelectedDong("전체"); // 지역 변경 시 동 초기화
//               }}
//             />
//             {region}
//           </label>
//         ))}

//         {selectedRegion !== "전체" && (
//           <>
//   <select
//     value={selectedDong}
//     onChange={(e) => setSelectedDong(e.target.value)}
//   >
//     <option value="전체">-- 동 선택 --</option>
//     {filteredDongs.map((dong, index) => (
//       <option key={index} value={dong}>
//         {dong}
//       </option>
//     ))}
//   </select>

//           </>
//         )}
//           <h3>카테고리</h3>
//           {categories.map((category) => (
//             <label key={category}>
//               <input
//                 type="radio"
//                 name="category"
//                 value={category}
//                 checked={selectedCategory === category}
//                 onChange={() => setSelectedCategory(category)}
//               />
//               {category}
//             </label>
//           ))}
//         </aside>
//         {/* 상품 리스트 */}
//         <section className="Listproduct-list">
//           {displayedProducts.map((product) => (
//             //라우터 쓸경우 link 사용
//             // <Link to={`/product/${product.id}`} key={product.id} className="product-card">
//             <div
//               key={product.id}
//               className="Listproduct-card"
//               onClick={() => onSelectProduct(product)} // 클릭하면 상세 페이지로 이동
//               style={{ cursor: "pointer" }}
//             >
//               <img src={product.image} alt={product.title} />
//               <h4>{product.title}</h4>
//               <p className="Listprice">{product.price}</p>
//               <p className="Listseller">판매자: {product.seller}</p>
//               <p className="Listregion">{product.region}</p>
//               <p className="Listcategory">{product.category}</p>
//             </div>
//             // </Link>
//           ))}
//         </section>
//       </div>
//       {/* 페이지네이션 버튼 */}
//       <div className="Listpagination">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           이전
//         </button>
//         <span>
//           {currentPage} / {totalPages}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           다음
//         </button>
{/* <button className="Listcreate">게시물 작성</button> */}
//       </div>
//     </div>
//   );
// };
// export default ProductListPage;
