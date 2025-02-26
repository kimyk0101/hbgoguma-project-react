// @TODO - 알림창 구현
import { useState, useEffect } from "react";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // 서버에서 알림 가져오기
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "http://localhost:18090/api/notifications/1"
      );
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("알림 데이터를 불러오는 중 오류 발생:", error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="notification-container">
      <button className="notification-button" onClick={toggleNotifications}>
        🔔 {notifications.length > 0 && `(${notifications.length})`}
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
