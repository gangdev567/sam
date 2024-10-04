import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

const PopupNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // 실제로는 웹소켓이나 다른 실시간 통신 방식을 사용하여 알림을 받을 것입니다.
    // 여기서는 예시를 위해 타이머를 사용합니다.
    const timer = setInterval(() => {
      setNotifications(prev => [...prev, { type: 'success', message: '새로운 알림!' }]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = (index) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={index}
          open={true}
          autoHideDuration={6000}
          onClose={() => handleClose(index)}
        >
          <Alert severity={notification.type}>{notification.message}</Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default PopupNotification;