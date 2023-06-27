import React from "react";
import "./input.css";
import { Col, Row } from "antd";

const InputValue = ({
  text,
  id,
  name,
  type,
  placeholder,
  onChange,
  onBlur,
  InputValue,
  bg,
  value,
}) => {
  return (
    <Row>
      <Col span={8}>
        <div className="ace-input-container">
          <p>{text}</p>
          <input
            value={value}
            style={bg}
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            InputValue={InputValue}
          />
        </div>
      </Col>
    </Row>
  );
};

export default InputValue;
