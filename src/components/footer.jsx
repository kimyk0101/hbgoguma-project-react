// @TODO - 푸터 구현
import React from "react";
import "../css/footer.css";
import QRCodeGenerator from "../components/qrCode.jsx"

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>거래 안내</h4>
          <p>직거래 및 택배거래 가능</p>
          <p>교환/반품 관련 사항은 판매자와 협의 필요</p>
          <h4>앱 다운로드</h4>
          <div className="footer-qr">
          <QRCodeGenerator url="http://l72.29.80.1/" />
            {/* <img src="src/resources/images/fake_qr.png" /> */}
          </div>
        </div>

        <div className="footer-section">
          <h4>고객센터</h4>
          <p>문의사항은 빠르게 답변해 드립니다.</p>
          {/* 버튼 기능은 없어욤 나중에 시간남으면 합시다*/}
          <a href="https://open.kakao.com/o/gsQNncVg">
            <button className="contact-btn kakao">카카오톡 문의하기</button>
          </a>
          <a href="https://help.naver.com/index.help">
            <button className="contact-btn naver">네이버 문의하기</button>
          </a>
          <p>운영시간: 월-금 10:00 - 18:00 (점심 12:00 - 13:00)</p>
          <p>(주말 및 공휴일 휴무)</p>
        </div>

        <div className="footer-section">
          <h4>공지사항</h4>
          <ul>
            <li>- 안전거래를 위한 유의사항</li>
            <li>- 중고거래 사기 예방 가이드</li>
            <li>- 새로운 기능 업데이트 안내</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ABOUT 호박고구마</h4>
          <p>(주)호박고구마</p>
          <p>대표이사: 김도형</p>
          <p>주소: 서울특별시 중고구 구거래동 123-45</p>
          <p>사업자 등록번호: 123-45-67890</p>
          <p>고객문의: support@hobakgoguma.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2025 호박고구마. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">파트너쉽</a>
          <a href="#">FAQ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
