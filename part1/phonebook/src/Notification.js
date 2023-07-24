import React from "react";
import "./styles.css";
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <>
      {message === "error" ? (
        <div className="error">{message}</div>
      ) : (
        <div className="success">{message}</div>
      )}
    </>
  );
};

export default Notification;
