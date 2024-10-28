import { message } from "antd";
import { useState } from "react";

const useMessageToast = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const showMessage = (type, content, duration = 4) => {
    switch (type) {
      case "success":
        setLoading(false);
        messageApi.success(content, duration);
        break;
      case "error":
        setLoading(false);
        messageApi.error(content, duration);
        break;
      case "info":
        messageApi.info(content, duration);
        break;
      case "warning":
        messageApi.warning(content, duration);
        break;
      case "loading":
        setLoading(true);
        messageApi.loading(content, duration);
        break;
      default:
        messageApi.info(content, duration);
    }

    // setTimeout(() => setLoading(false), 1 * 1000); // Stop loading after the duration
  };

  // New function to close the current message
  const closeMessage = () => {
    messageApi.destroy();
    setLoading(false);
  };

  return { showMessage, contextHolder, loading, setLoading, closeMessage };
};

export default useMessageToast;
