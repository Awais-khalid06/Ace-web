import React from "react";

const SmallBtn = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="ace-admin-fixtures-add-fixture-fixture-select-team-btn"
    >
      <h3>{text}</h3>
    </div>
  );
};

export default SmallBtn;
