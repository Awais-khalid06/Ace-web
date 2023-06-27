import React from "react";

const getUploadURL = () => {};

const TestingUpload = () => {
  return (
    <div style={{ alignSelf: "center" }}>
      <input
        accept="image/*"
        onChange={getUploadURL}
        id="networkIcon"
        type="file"
      />
    </div>
  );
};

export default TestingUpload;
