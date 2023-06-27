import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../components/User Side/Home/Home";
import AboutUs from "../components/User Side/About Us/AboutUs";
import ContactUs from "../components/User Side/Contact Us/ContactUs";
import Login from "../components/User Side/Signin/Login";
import SignUp from "../components/User Side/SignUp/SignUp";
import ForgetPasswordEmail from "../components/User Side/ForgetPasswordEmail/ForgetPasswordEmail";
import Codeverification from "../components/User Side/CodeVerification/CodeVerification";
import ConfirmPassword from "../components/User Side/ConfirmPassword/ConfirmPassword";
import Choosegender from "../components/User Side/ChooseGender/Choosegender";
import Choosesport from "../components/User Side/ChooseSport/ChooseSport";
import ChooseAgeGroup from "../components/User Side/ChooseAgeGroup/ChooseAgeGroup";
import UploadProfile from "../components/User Side/UploadProfile/UploadProfile";
import ForgetPasswordMobile from "../components/User Side/ForgetPasswordMobile/ForgetPasswordMobile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Admin Side/layout";
import LayoutACE from "../components/Admin Side/layout";

const Navigation = () => {
  const Navigate = useNavigate();
  const data = useSelector((data) => data.Data.userData.token);
  console.log("data", data);
  //const data = null;
  useEffect(() => {
    if (data == undefined) {
      Navigate("/");
    } else {
      Navigate("/dashboard/AdminHome");
    }
  }, [data]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ForgetPasswordEmail" element={<ForgetPasswordEmail />} />
      <Route path="/Codeverification" element={<Codeverification />} />
      <Route path="/ConfirmPassword" element={<ConfirmPassword />} />
      <Route path="/Choosegender" element={<Choosegender />} />
      <Route path="/Choosesport" element={<Choosesport />} />
      <Route path="/ChooseAgeGroup" element={<ChooseAgeGroup />} />
      <Route path="/UploadProfile" element={<UploadProfile />} />
      <Route path="/ForgetPasswordMobile" element={<ForgetPasswordMobile />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="dashboard/*" element={<LayoutACE />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
