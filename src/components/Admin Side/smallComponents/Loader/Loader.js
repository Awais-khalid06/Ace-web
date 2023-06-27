import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = ({ marginVetical }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "50rem",
        marginTop:
          marginVetical?.top != undefined ? marginVetical?.top : "150px",
        marginBottom:
          marginVetical?.bottom != undefined ? marginVetical?.bottom : "190px",
      }}
    >
      <FadeLoader
        color="#82EF00"
        cssOverride={{
          color: "red",
        }}
        speedMultiplier={1}
        size={25}
      />
    </div>
  );
};

export default Loader;
