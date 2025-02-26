// @TODO - 알림창 구현
import { useState, useEffect } from "react";

export default function Notification({ isLoggedIn, userId }) {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // 서버에서 알림 가져오기
  const fetchNotifications = async () => {
    try {
      if (!userId) return; // 로그인하지 않은 경우 요청 안 함

      const response = await fetch(
        `http://localhost:18090/api/notifications/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        // 읽지 않은 알림 개수 계산
        const unread = data.filter((notif) => !notif.read).length;
        setUnreadCount(unread);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("알림 데이터를 불러오는 중 오류 발생:", error);
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn]);

  const toggleNotifications = () => {
    setIsVisible((prev) => !prev);
  };

  if (!isLoggedIn) return null; // 로그인하지 않으면 버튼 숨김

  return (
    <div className="notification-container">
      <button className="notification-button" onClick={toggleNotifications}>
        {/* 🔔 {notifications.length > 0 && `(${notifications.length})`} */}
        🔔 {unreadCount > 0 && `(${unreadCount})`}
      </button>

      {isVisible && (
        <div className={`notification-dropdown ${isVisible ? "active" : ""}`}>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
          ) : (
            <p>📭 새로운 알림이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}
// [
//   [1, "새로운 구매요청이 있습니다!"],

//   { id: 1, message: "📢 새로운 구매 요청이 있습니다!", isRead: false },
//   { id: 2, message: "✅ 거래가 확정되었습니다!", isRead: false },
//   {
//     id: 3,
//     message: "📫 판매글에 새로운 댓글이 추가되었습니다!",
//     isRead: false,
//   },
// ];
