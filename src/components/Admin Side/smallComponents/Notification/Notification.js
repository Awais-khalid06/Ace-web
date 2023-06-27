import React from "react";
import { notification } from "antd";

export const GreenNotification = (message, descri) => {
  return notification.open({
    message: message,
    description: descri,
    // className: "notificationDesign",
    style: { color: "#fff", background: "green" },
  });
};

export const RedNotification = (message, descri) => {
  return notification.open({
    message: message,
    description: descri,
    // className: "notificationDesign",
    style: { color: "#fff", background: "red" },
  });
};
