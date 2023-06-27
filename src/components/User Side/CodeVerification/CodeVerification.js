import React, { useState } from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import InputValue from "../../../smallComponets/Input/Input";
import "./Codeverification.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import OtpInput from "react18-otp-input";
import { useNavigate } from "react-router-dom";

import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import Footer from "../../../HOC/User Side/footer/Footer";

const Codeverification = () => {
  const Navigate = useNavigate();
  const [otp, setOtp] = useState("");

  console.log("value", otp);
  return (
    <div className="ace__container">
      <NavBar />
      <div className="ace-forgetPasswordEmail-iunput-container">
        <h1>Forgot Password</h1>
        <p className="ace-forgetPasswordEmail-iunput-para">
          Enter the verification code that we just sent to your email address
        </p>

        <div style={{ margin: "5.4rem 0  0 0" }}>
          <OtpInput
            // focusStyle="focusStyle"
            inputStyle="inputStyle"
            numInputs={5}
            onChange={(value) => setOtp(value)}
            separator={<span> </span>}
            isInputNum={true}
            shouldAutoFocus
            value={otp}
          />
        </div>

        <div className="ace-codeVerification-resend-text">
          <p>
            Didn,t Get Any Code?
            <span>
              <Link to="/ForgetPasswordEmail"> Resend</Link>
            </span>
          </p>
        </div>
        <div style={{ margin: "0 0 16.9rem 0" }}>
          <SubmitButton
            onClick={() => Navigate("/ConfirmPassword")}
            text={"Send"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Codeverification;
