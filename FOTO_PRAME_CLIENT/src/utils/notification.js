import { useState } from "react";

const useNotification = () => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const newState = { vertical: "top", horizontal: "right" };

  const handleCloseAlert = () => {
    setState({ ...state, open: false, message: "" });
  };

  const generateAlert = (msg) => {
    setState({
      ...newState,
      open: true,
      message: msg,
    });
  };

  return {
    notificationState: state,
    handleCloseAlert,
    generateAlert,
  };
};

export default useNotification;
