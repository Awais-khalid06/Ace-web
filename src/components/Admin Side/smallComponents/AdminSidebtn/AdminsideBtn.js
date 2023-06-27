import React from "react";
import "./AdminSidebtn.css";

const AdminsideBtn = ({ text, onClick, type }) => {
  return (
    <div
      onClick={onClick}
      className="ace-admin-sml-comp-admin-side-btn-main_container"
      typeof={type}
    >
      <h2>{text}</h2>
    </div>
  );
};

export default AdminsideBtn;
