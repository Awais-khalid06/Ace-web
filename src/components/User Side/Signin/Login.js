import React, { useState } from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import InputValue from "../../../smallComponets/Input/Input";
import Inputpassword from "../../../smallComponets/Input/inputPassword/Inputpassword";
import "./Login.css";
import { Link } from "react-router-dom";
import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import SocailLogin from "../../../smallComponets/Input/SocailLogin/SocailLogin";
import Footer from "../../../HOC/User Side/footer/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../../Redux/ACEDataSlice";
import { notification } from "antd";
import Spiner from "../../../smallComponets/Input/spiner/spiner";

const Login = () => {
  const [isloading, setIsloading] = useState(false);

  const openNotification = () => {
    notification.open({
      message: "ACE Login",
      description: "You are successfully Login.",
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

  let disPatch = useDispatch();
  const LoginData = (email, password) => {
    setIsloading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
      role: "coach",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/user/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        try {
          setIsloading(false);
          console.log("result", result);
          // setLoginMsg(result.message);
          if (result.message) {
            openNotification2(result.message);
          }

          if (!result.message) {
            setIsloading(false);
            openNotification();

            disPatch(userData(result));
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
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is required"),
    }),
    onSubmit: (val) => {
      LoginData(val.email, val.password);
    },
  });
  return (
    <div className="ace__container">
      <NavBar />

      <form onSubmit={formik.handleSubmit}>
        <div className="ace-login-input-container">
          <h1>Login</h1>
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
          <Inputpassword
            text={"Password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="formikError">{formik.errors.password}</div>
          ) : null}
          <div className="ace-login-forgetPassword-text-container">
            <p>
              <Link to="/ForgetPasswordEmail">Forgot Password? </Link>
            </p>
          </div>
          <div style={{ margin: "7.4rem 0 6.4rem 0" }}>
            <SubmitButton text={"Sign in"} isloading={isloading} />
          </div>

          <p className="ace-login-orwith">Or With</p>
          <SocailLogin />
          <div className="ace-login-move-signUp">
            <p>
              New To Ace?
              <span>
                <Link to="/signup"> Signup Here</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
