import React, { useState } from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import InputValue from "../../../smallComponets/Input/Input";
import "./ForgetPasswordEmail.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import Footer from "../../../HOC/User Side/footer/Footer";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const ForgetPasswordEmail = () => {
  const [isloading, setIsloading] = useState(false);
  const Navigate = useNavigate();

  const openNotification = () => {
    notification.open({
      message: "ACE Login",
      description: "You are successfully SignUp.",
      // className: "notificationDesign",
      style: { color: "#fff", background: "green" },
    });
  };

  const openNotification2 = (value) => {
    notification.open({
      message: "ACE Login",
      description: value,
      // className: "notificationDesign",
      style: { color: "#fff", background: "red" },
    });
  };

  const SendVerificationCode = (email) => {
    setIsloading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", "");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      role: "coach",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/user/sendVerficationCode",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        try {
          setIsloading(false);
          console.log("result", result);
          // setLoginMsg(result.message);
          if (result.message) {
            setIsloading(false);
            openNotification2(result.message);
          }

          if (!result.message) {
            setIsloading(false);
            openNotification();
            Navigate("/Codeverification");

            // disPatch(userData(result));
          }
          //console.log('result', result);
        } catch (error) {
          if (error) {
            setIsloading(false);
            console.log("error in Catch", error);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      SendVerificationCode(values.email);
    },
  });
  return (
    <div className="ace__container">
      <NavBar />
      <form onSubmit={formik.handleSubmit}>
        <div className="ace-forgetPasswordEmail-iunput-container">
          <h1>Forgot Password</h1>
          <p className="ace-forgetPasswordEmail-iunput-para">
            Enter the email address associated with your account
          </p>
          <InputValue
            text={"Email"}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email.toLowerCase()}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="formikError">{formik.errors.email}</div>
          ) : null}
          <div className="ace-forgetPasswordEmail-iunput-link">
            {/* <p>
              <Link to="/ForgetPasswordMobile">
                Want To Get Code On Mobile Number?
              </Link>
            </p> */}
          </div>
          <div style={{ margin: "0 0 16.9rem 0" }}>
            <SubmitButton
              //onClick={() => Navigate("/Codeverification")}
              text={"Send"}
              isloading={isloading}
            />
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default ForgetPasswordEmail;
