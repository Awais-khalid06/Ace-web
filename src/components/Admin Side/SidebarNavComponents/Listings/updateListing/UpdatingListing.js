import React, { useState } from "react";
import DropDown from "../../../../../smallComponets/Input/DropDown/DropDown";
import InputValue from "../../../../../smallComponets/Input/Input";

import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import { useNavigate } from "react-router-dom";
import TextAreaView from "../../Objectives/smallcomponents/TextArea/TextArea";
import { optionOfPosition } from "../../Objectives/optionOfDropDown/OptionOfDropDown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { useLocation } from "react-router-dom";
import { GreenNotification } from "../../../smallComponents/Notification/Notification";
import Route from "../../../../../Api/Route";
import { GeneralFetch } from "../../../../../Api/ApiCaller";

const UpdatingListing = () => {
  const { state } = useLocation();
  const data = useSelector((data) => data.Data.userData);
  const [isloading, setIsloading] = useState(false);
  const [selectedRole, setSelecteRole] = useState({
    label: state?.listingItem?.lookingFor,
    value: state?.listingItem?.lookingFor,
  });

  const Navigate = useNavigate();

  const upDateListing = (title, message) => {
    setIsloading(true);
    const body = {
      id: state.id,
      name: title,
      details: message,
      lookingFor: selectedRole.value,
      isActive: state?.listingItem?.isActive,
    };
    const getDeletRes = (res) => {
      GreenNotification("My Listing", `${res.name} is Updating.`);
      Navigate("/dashboard/listings");
      console.log(res);
    };
    GeneralFetch(
      data.token,
      "POST",
      Route.updateListing,
      body,
      setIsloading,
      getDeletRes,
      (error) => {}
    );
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: state?.listingItem?.name,
      message: state?.listingItem?.details,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),

      message: Yup.string()
        .max(300, "Must be 300 characters or less")
        .required("Required"),
    }),
    onSubmit: (val) => {
      upDateListing(val.name, val.message);
    },
  });

  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Listings</h2>
        </div>
      </div>
      <div className="ace-listings-add_new_listing-container">
        <h2>Updating Listing</h2>
        <div></div>
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="ace-admin-fixtures-add-fixture-fixture-container">
            <InputValue
              text={"Listing Name"}
              bg={{ background: " #2B2D30" }}
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
            <TextAreaView
              text={"Listing Details"}
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
            <div style={{ padding: "2rem 0 0 0" }}>
              <DropDown
                bg={{ background: " #2B2D30" }}
                text={"Looking For"}
                options={optionOfPosition}
                selected={selectedRole}
                setSelected={setSelecteRole}
              />
            </div>
            <div style={{ padding: "8.4rem 0 3.2rem 0" }}>
              <SubmitButton text={"Continue"} isloading={isloading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatingListing;
