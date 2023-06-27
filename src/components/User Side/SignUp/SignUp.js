import React from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import "./SignUp.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputValue from "../../../smallComponets/Input/Input";
import Inputpassword from "../../../smallComponets/Input/inputPassword/Inputpassword";
import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import SocailLogin from "../../../smallComponets/Input/SocailLogin/SocailLogin";
import { Link } from "react-router-dom";
import Footer from "../../../HOC/User Side/footer/Footer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const Navigate = useNavigate();
  const { state } = useLocation();

  const signUpData = (email, mobileNumber, name, password) => {
    Navigate("/Choosegender", {
      state: {
        email: email,
        mobileNumber: mobileNumber,
        name: name,
        password: password,
      },
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      mobileNumber: Yup.number()
        // .matches(/(01)(\d){8}\b/, 'Enter a valid mobile number')
        .required("Mobile number is required")
        .positive()
        .integer()
        .max(99999999999999999, "Number limit is 20"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
    }),
    onSubmit: (val) => {
      signUpData(val.email, val.mobileNumber, val.name, val.password);
    },
  });
  return (
    <div className="ace__container">
      <NavBar />
      <form onSubmit={formik.handleSubmit}>
        <div className="ace-signUp-inpiut-container">
          <h1>Signup</h1>
          <InputValue
            text="Name"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="formikError">{formik.errors.name}</div>
          ) : null}

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
          <InputValue
            text="Mobile Number"
            id="mobileNumber"
            name="mobileNumber"
            type="mobileNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobileNumber}
          />
          {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
            <div className="formikError">{formik.errors.mobileNumber}</div>
          ) : null}
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
          <div style={{ margin: "4.8rem  0 3.8rem 0" }}>
            <SubmitButton text={"Continue"} />
          </div>
          <p className="ace-signUp-orwith">Or With</p>
          <SocailLogin />
          <div className="ace-login-move-signUp">
            <p>
              By Clicking Signup Or Continue With.
              <span>
                <Link to="/login">
                  you agree to Ace Terms of User and Privacy Policy
                </Link>
              </span>
            </p>
          </div>
        </div>
        <Footer />
      </form>
    </div>
  );
};

export default SignUp;
