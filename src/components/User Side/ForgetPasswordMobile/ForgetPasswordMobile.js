import React from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import InputValue from "../../../smallComponets/Input/Input";
import "./ForgetpasswordMobile.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import Footer from "../../../HOC/User Side/footer/Footer";

const ForgetPasswordMobile = () => {
  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.number()
        // .matches(/(01)(\d){8}\b/, 'Enter a valid mobile number')
        .required("Mobile number is required")
        .positive()
        .integer()
        .max(99999999999999999, "Number limit is 20"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  return (
    <div className="ace__container">
      <NavBar />
      <div className="ace-forgetPasswordEmail-iunput-container">
        <h1>Forgot Password</h1>
        <p className="ace-forgetPasswordEmail-iunput-para">
          Enter the mobile number associated with your account
        </p>
        <InputValue
          text="Mobile Number"
          id="mobileNumber"
          name="mobileNumber"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobileNumber}
        />
        {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
          <div className="formikError">{formik.errors.mobileNumber}</div>
        ) : null}
        <div className="ace-forgetPasswordEmail-iunput-link">
          <p>
            <Link to="/ForgetPasswordEmail">Want To Get Code On Email?</Link>
          </p>
        </div>
        <div style={{ margin: "0 0 16.9rem 0" }}>
          <SubmitButton text={"Send"} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgetPasswordMobile;
