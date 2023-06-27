import React from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import InputValue from "../../../smallComponets/Input/Input";
import "./ConfirmPassword.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import Footer from "../../../HOC/User Side/footer/Footer";
import { useNavigate } from "react-router-dom";
import Inputpassword from "../../../smallComponets/Input/inputPassword/Inputpassword";

const ConfirmPassword = () => {
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    password: Yup.string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  return (
    <div className="ace__container">
      <NavBar />
      <form onSubmit={formik.handleSubmit}>
        <div className="ace-forgetPasswordEmail-iunput-container">
          <h1>Forgot Password</h1>

          <p className="ace-forgetPasswordEmail-iunput-para">
            Fill the new password to update
          </p>

          <Inputpassword
            text="Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="formikError">{formik.errors.password}</div>
          ) : null}
          <Inputpassword
            text="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="formikError">{formik.errors.confirmPassword}</div>
          ) : null}

          <div style={{ margin: "11.3rem 0 11rem 0" }}>
            <SubmitButton
              //   onClick={() => Navigate("/Codeverification")}
              text={"Update"}
            />
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default ConfirmPassword;
