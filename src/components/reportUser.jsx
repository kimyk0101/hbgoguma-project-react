// @TODO - 유저 신고 기능 구현

const reportUser = () => {
  const [showReportPopup, setShowReportPopup] = useState(false); // 신고 팝업 표시 여부
  const [reportReason, setReportReason] = useState(""); // 선택된 신고 사유

  // 신고 사유 목록
  const reportReasons = [
    "허위 매물",
    "부적절한 게시글",
    "사기 의심",
    "기타 사유",
  ];

  // 신고 버튼 클릭 시 팝업 열기
  const handleOpenReportPopup = () => {
    setShowReportPopup(true);
  };

  // 신고 팝업 닫기
  const handleCloseReportPopup = () => {
    setShowReportPopup(false);
    setReportReason("");
  };

  // 신고 제출
  const handleReportSubmit = () => {
    if (!reportReason) {
      alert("신고 사유를 선택해주세요.");
      return;
    }

    const reportData = {
      rid: Date.now(), // 신고 번호 (임시)
      uid: 1, // 신고한 사용자 ID
      pid: post.id, // 신고당한 게시글 ID
      reportId: reportReasons.indexOf(reportReason) + 1, // 신고 사유 ID
      isConfirm: false, // 신고 처리 여부 (초기값 false)
      reportDate: new Date().toISOString(), // 신고 일시
    };

    alert("신고가 접수되었습니다.");
    handleCloseReportPopup();
  };

  return (
    <>
      {/* 신고하기 버튼 */}
      <button className="detail-report-button" onClick={handleOpenReportPopup}>
        🚨 신고하기
      </button>
      {/* 신고 팝업 */}
      {showReportPopup && (
        <div className="detail-report-popup">
          <div className="detail-popup-content">
            <h3>게시글 신고</h3>
            <p>신고 사유를 선택해주세요.</p>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">-- 신고 사유 선택 --</option>
              {reportReasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            <div className="detail-popup-buttons">
              <button
                className="detail-submit-button"
                onClick={handleReportSubmit}
              >
                신고하기
              </button>
              <button
                className="detail-cancel-button"
                onClick={handleCloseReportPopup}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default reportUser;
