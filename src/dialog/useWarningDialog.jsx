import { useState } from "react";

const useWarningDialog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showWarning = (warningMessage) => {
    setMessage(warningMessage);
    setIsVisible(true);
  };

  const hideWarning = () => {
    setIsVisible(false);
  };

  return {
    isVisible,
    message,
    showWarning,
    hideWarning,
  };
};

export default useWarningDialog;
