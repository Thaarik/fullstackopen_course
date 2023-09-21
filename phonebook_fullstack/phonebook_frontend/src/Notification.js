import React from "react";
import "./styles.css";
const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }
  console.log(message)
  return (
    <>
      {messageType === "error" ? (
        <div className="error">{message}</div>
      ) : (
        <div className="success">{message}</div>
      )}
    </>
  );
};

export default Notification;
