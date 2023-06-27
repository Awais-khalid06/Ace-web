import React from "react";

const TextAreaView = ({ name, id, type, onChange, onBlur, value, text }) => {
  return (
    <div>
      <div
        style={{ marginTop: "2rem" }}
        className="ace-admin-objectives-add-new_trainig-text_area-heading"
      >
        <p style={{ marginBottom: "0rem" }}>{text}</p>
        <textarea
          name={name}
          id={id}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </div>
    </div>
  );
};

export default TextAreaView;
