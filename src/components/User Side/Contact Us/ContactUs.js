import React from "react";
import Footer from "../../../HOC/User Side/footer/Footer";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import InputValue from "../../../smallComponets/Input/Input";
import "./ContactUs.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      name: "",

      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),

      email: Yup.string().email("Invalid email address").required("Required"),
      subject: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      message: Yup.string()
        .max(300, "Must be 300 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  return (
    <div className="ace__container">
      <NavBar />
      <form onSubmit={formik.handleSubmit}>
        <div className="ace-contactUs-container">
          <h1>Contact</h1>
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
            text="Email Address"
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
            text="Subject"
            id="subject"
            name="subject"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
          />
          {formik.touched.subject && formik.errors.subject ? (
            <div className="formikError">{formik.errors.subject}</div>
          ) : null}
          <div>
            <p style={{ marginBottom: "0" }}>Message</p>
            <textarea
              id="message"
              name="message"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="formikError">{formik.errors.message}</div>
            ) : null}
          </div>
          <div className="ace-contactus-btnContainer">
            <SubmitButton text="Send Message" />
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default ContactUs;
