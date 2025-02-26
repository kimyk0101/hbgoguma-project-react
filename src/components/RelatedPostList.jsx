import React, { useState, useEffect } from "react";

const RelatedPostList = () => {
    const [relatedPostList, SetRelatedPostList] = useState([]);

  // 추천 상품 리스트 (GET)
  const relatedProduct = async (pid) => {
    try {
      const response = await fetch(`http://localhost:18090/api/gogumapost/${pid}/related`, {
        method: "GET",
        credentials: "include", // 쿠키 포함 요청
      });
  
      console.log(response);  // 응답 상태를 확인해보세요
      if (response.ok) {
        const data = await response.json();
        console.log("받아온 추천 리스트:", data);
        SetRelatedPostList(data.map(item => ({
          regionDong: item.loca_dong, // 지역 (동 정보만 사용)
          title: item.post_title, 
          image: item.post_photo,
          price: item.post_price || "가격 미정",
        })));
      } else {
        console.error("추천 리스트를 받아오지 못했습니다.");
        const errorText = await response.text();
        console.error("서버 응답 내용:", errorText); // 서버에서 반환한 오류 메시지
      }
    } catch (error) {
      console.error("추천 리스트 받아오던 중 오류 발생:", error);
    }

    useEffect(() => {
      relatedProduct(); 
    }, []);
}

    return (
        <div className="detail-related-products">
        <h3>이런 상품은 어떠세요?</h3>
        <div className="detail-related-list">
          {relatedPostList.length > 0 ? (
            relatedPostList.map((item) => (
              <div className="detail-related-item">
                <img
                  src={item.image}
                  alt="상품 이미지"
                  className="detail-related-image"
                />
                <p className="detail-related-title">{item.title}</p>
                <p className="detail-related-price">
                  {item.price.toLocaleString()}원
                </p>
                <p className="detail-related-location">{item.regionDong}</p>
              </div>
            ))
          ) : (
            <p>추천 상품이 없습니다.</p>
          )}
        </div>
      </div>

    )

}
export default RelatedPostList;
