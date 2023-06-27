import React, { useState } from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import InputValue from "../../../smallComponets/Input/Input";

import { useFormik } from "formik";
import { Link } from "react-router-dom";
import OtpInput from "react18-otp-input";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import Footer from "../../../HOC/User Side/footer/Footer";
import DropDown from "../../../smallComponets/Input/DropDown/DropDown";

const ChooseAgeGroup = () => {
  const { state } = useLocation();
  const options = [
    { label: "U16", value: "u16" },
    { label: "U17", value: "u17" },
    { label: "U18", value: "u18" },
    { label: "U19", value: "u19" },
    { label: "U20", value: "u20" },
    { label: "U21", value: "u21" },
    { label: "U22", value: "u22" },
  ];

  const [selected, setSelected] = useState({
    label: "U16",
    value: "u16",
  });
  const signUpData = () => {
    Navigate("/UploadProfile", {
      state: {
        email: state.email,
        mobileNumber: state.mobileNumber,
        name: state.name,
        password: state.password,
        gender: state.gender,
        sport: state.sport,
        ageGroup: selected.label,
      },
    });
  };

  const Navigate = useNavigate();
  //console.log(selected.value);

  return (
    <div className="ace__container">
      <NavBar />
      <div className="ace-forgetPasswordEmail-iunput-container">
        <h1>Team Age Group</h1>
        <p className="ace-forgetPasswordEmail-iunput-para">
          Choose athletes age group you want to coach
        </p>
        <div style={{ padding: "0 0 15.4rem 0" }}>
          <DropDown
            text={"Age Group"}
            options={options}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        <div style={{ margin: "0 0 16.9rem 0" }}>
          <SubmitButton onClick={signUpData} text={"Continue"} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChooseAgeGroup;
