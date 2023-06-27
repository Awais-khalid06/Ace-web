import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: "#fff",
    }}
    spin
    color="#ffffff"
  />
);

const Spiner = () => {
  return <Spin indicator={antIcon} />;
};

export default Spiner;
