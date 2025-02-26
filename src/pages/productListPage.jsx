import React, { useEffect, useState } from "react";
import "../css/productListPage.css";
import Footer from "../components/footer";
import Header from "../components/header";
import Advertise from "../components/advertise";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/searchBar";
import PopularKeywords from "../components/PopularKeywords";

const regions = ["전체", "강남구", "서초구"];

const regionMap = {
  1: "강남구",
  2: "서초구",
};

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
  ["1", "개포1동"],
  ["2", "개포2동"],
  ["3", "개포3동"],
  ["4", "개포4동"],
  ["5", "논현1동"],
  ["6", "논현2동"],
  ["7", "대치1동"],
  ["8", "대치2동"],
  ["9", "대치4동"],
  ["10", "도곡1동"],
  ["11", "도곡2동"],
  ["12", "삼성1동"],
  ["13", "삼성2동"],
  ["14", "세곡동"],
  ["15", "수서동"],
  ["16", "신사동"],
  ["17", "압구정동"],
  ["18", "역삼1동"],
  ["19", "역삼2동"],
  ["20", "일원1동"],
  ["21", "일원본동"],
  ["22", "청담동"],
  ["23", "내곡동"],
  ["24", "반포1동"],
  ["25", "반포2동"],
  ["26", "반포3동"],
  ["27", "반포4동"],
  ["28", "반포본동"],
  ["29", "방배1동"],
  ["30", "방배2동"],
  ["31", "방배3동"],
  ["32", "방배4동"],
  ["33", "방배본동"],
  ["34", "서초1동"],
  ["35", "서초2동"],
  ["36", "서초3동"],
  ["37", "서초4동"],
  ["38", "양재1동"],
  ["39", "양재2동"],
  ["40", "잠원동"],
];

const dongMap = Object.fromEntries(
  dongs.map(([id, name]) => [Number(id), name])
);

const CATEGORY_ID = [
  ["0", "전체"],
  ["1", "디지털기기"],
  ["2", "가구/인테리어"],
  ["3", "유아동"],
  ["4", "의류"],
  ["5", "잡화"],
  ["6", "생활가전"],
  ["7", "생활/주방"],
  ["8", "스포츠/레저"],
  ["9", "취미/게임/음반"],
  ["10", "뷰티/미용"],
  ["11", "식물"],
  ["12", "식품"],
  ["13", "반려동물"],
  ["14", "티켓/교환권"],
  ["15", "도서"],
  ["16", "기타"],
];

// const popularKeywords = [
//   "아이폰",
//   "노트북",
//   "삼성",
//   "에어팟",
//   "갤럭시",
//   "닌텐도",
//   "다이소",
//   "레고",
//   "패딩",
//   "자전거",
// ];

const ITEMS_PER_PAGE = 12;

const ProductListPage = () => {
  //@note - 서버 위치
  const API_POST_URL = `http://localhost:18090/api/gogumapost`;
  const API_USER_URL = `http://localhost:18090/api/gogumauser`;

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글 상태 추가
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedDong, setSelectedDong] = useState("전체");
  const [tempSearchTerm, setTempSearchTerm] = useState(""); // 입력값 저장
  const [searchTerm, setSearchTerm] = useState(""); // 실제 검색 적용 값
  const [user, setUser] = useState([]); //  login 부분
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부

  // 검색 실행 함수
  const handleSearch = () => {
    setSearchTerm(tempSearchTerm); // 검색 버튼 클릭 시 적용
  };

  // Enter 키 이벤트 핸들러
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 입력 시 검색 실행
    }
  };
  const filteredDongs =
    selectedRegion === "전체" ? [] : allDongs[selectedRegion] || [];
  const filteredPosts = posts.filter(
    (post) =>
      (selectedRegion === "전체" || post.regionGu === selectedRegion) &&
      (selectedDong === "전체" || post.regionDong === selectedDong) &&
      (selectedCategory === 0 || post.category === selectedCategory) &&
      post.title.includes(searchTerm)
  );

  const handleNavigation = (path) => {
    window.location.href = path;
  };
  const [currentPage, setCurrentPage] = useState(1);

  // 로그인 상태 확인 함수
  const checkLoginStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:18090/api/gogumauser/session",
        {
          method: "GET",
          credentials: "include", // 쿠키를 포함하여 요청
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUser(data); // 로그인된 사용자 정보 저장
        console.log(data);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류 발생:", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // 컴포넌트가 마운트될 때 로그인 상태 확인
  }, []);

  //서버에서 데이터 가져오기
  useEffect(() => {
    fetch(API_POST_URL) // 여기에 실제 API 입력
      .then((response) => response.json())
      .then((data) => {
        const postData = data.map((item) => ({
          id: item.pid, // 서버에서 받은 상품 ID
          sellerUid: item.uid, // 판매자 UID
          selectedUser: item.selected_uid, // 선택된 유저
          regionGu: regionMap[item.loca_gu] || "알 수 없음", // 숫자를 지역명으로 변환
          regionDong: dongMap[item.loca_dong] || "알 수 없음", // 숫자를 동명으로 변환
          title: item.post_title, // 제목
          image: item.post_photo, // 상품 이미지
          content: item.post_content, // 상품 설명
          category: item.post_category, // 카테고리
          price: item.post_price || "가격 미정", // 가격 (백엔드에 따라 수정)
          userList: item.user_list, // 구매 희망하는 유저 리스트
          reportCnt: item.report_cnt, // 신고 횟수
          // updateTime: item.upd_date, // 마지막 업데이트 시간
          seller: item.nickname, // 판매자 닉네임
        }));
        setPosts(postData);
      })
      .catch((error) => console.error("데이터 불러오기 실패:", error));
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedPosts = filteredPosts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  //인기 검색어 클릭 시 검색창에 입력 후 자동 검색
  const handlePopularKeywordClick = (keyword) => {
    setSearchTerm(keyword);
  };

  //  상세 페이지로 이동
  const navigate = useNavigate();

  const goToDetail = (postId) => {
    navigate(`/${postId}`);
  };

  return (
    <>
      <Header />
      <SearchBar
        searchTerm={tempSearchTerm}
        setSearchTerm={setTempSearchTerm} // 즉시 반영되지 않도록 변경
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
      />
      <PopularKeywords onKeywordClick={handlePopularKeywordClick} />
      <Advertise />
      <div className="Listcontainer">
        {/* 검색창 */}
        {/* <input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="Listsearch-input"
        /> */}
        {/* 인기검색어 */}
        {/* <div className="Listpopular-keywords">
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
        </div> */}

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

            {/* 동 선택 (지역이 전체가 아닐 때만 노출) */}
            {selectedRegion !== "전체" && (
              <select
                value={selectedDong}
                onChange={(e) => setSelectedDong(e.target.value)}
              >
                <option value="전체">-- 동 선택 --</option>
                {filteredDongs.map((dong) => (
                  <option key={dong} value={dong}>
                    {dong}
                  </option>
                ))}
              </select>
            )}
            <h3>카테고리</h3>
            {Object.entries(CATEGORY_ID).map(([key, category]) => (
              <label key={key}>
                <input
                  type="radio"
                  name="category"
                  value={key}
                  checked={selectedCategory === Number(key)}
                  onChange={() => {
                    setSelectedCategory(Number(key));
                    setCurrentPage(1);
                  }}
                />
                {categories[key]}
              </label>
            ))}
          </aside>

          {/* 상품 리스트 */}
          {user.is_Admin && (
            <p className="admin-alert">관리자 모드 활성화됨 ✅</p>
          )}

          <section className="Listproduct-list">
            {displayedPosts.map((post) => {
              // 🔹 관리자일 때만 신고 횟수에 따라 배경색 변경
              const opacity = user.is_admin
                ? Math.min(post.reportCnt / 20, 1)
                : 0; // 일반 사용자는 투명
              const backgroundColor = `rgba(255, 0, 0, ${opacity})`; // 신고 횟수가 많을수록 붉어짐

              return (
                <div
                  key={post.id}
                  className="product-card"
                  onClick={() => goToDetail(post.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* 🚨 신고 배경 박스 */}
                  <div
                    className="report-overlay"
                    style={{ backgroundColor }}
                  ></div>

                  <img src={post.image} alt={post.title} />
                  <h4>{post.title}</h4>
                  <p className="Listprice">
                    {post.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"}
                  </p>
                  <p className="Listseller">판매자: {post.seller}</p>
                  <p className="ListregionDong">{post.regionDong}</p>
                  <p className="Listcategory">
                    {categories[Number(post.category)]}
                  </p>

                  {/* 🔥 관리자 전용 신고 횟수 표시 */}
                  {user.is_admin && (
                    <p className="report-count">신고: {post.reportCnt}회</p>
                  )}
                </div>
              );
            })}
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

          <button
            className="Listcreate"
            onClick={() => handleNavigation("/salesPage")}
          >
            게시물 작성
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductListPage;
