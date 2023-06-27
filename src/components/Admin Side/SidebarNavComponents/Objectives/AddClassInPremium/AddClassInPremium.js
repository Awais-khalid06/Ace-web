import React, { useState } from "react";
import DropDown from "../../../../../smallComponets/Input/DropDown/DropDown";
import InputValue from "../../../../../smallComponets/Input/Input";
import dummyImage from "./../static/dummy-image.png";

import {
  optionOfClasses,
  optionOfWeeks,
  optionsOfTraningLevel,
} from "../optionOfDropDown/OptionOfDropDown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";

const AddClassInPremium = () => {
  const { state } = useLocation();
  const Navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState({
    label: "Class1",
    value: "0",
  });
  const [isloading, setIsloading] = useState(false);
  const data = useSelector((data) => data.Data.userData);

  const openNotification = () => {
    notification.open({
      message: "New Premium",
      description: "Add Premium successfully",
      // className: "notificationDesign",
      style: { color: "#fff", background: "green" },
    });
  };

  const openNotification2 = (value) => {
    notification.open({
      message: "New Premium",
      description: value,
      // className: "notificationDesign",
      style: { color: "#fff", background: "red" },
    });
  };
  const addClassPremium = (title) => {
    setIsloading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      objective: state.objectiveId,
      week: selectedClass.label,
      title: title,
      video:
        "https://try-s3-upload-plz.s3.us-east-2.amazonaws.com/image1664903818486",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/classes/add",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("class of premium", result);
        try {
          if (result.message) {
            setIsloading(false);
            openNotification2(result.message);
          }

          if (!result.message) {
            setIsloading(false);
            openNotification();
            Navigate("/dashboard/objectives");
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
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
    }),
    onSubmit: (val) => {
      addClassPremium(val.title);
    },
  });

  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Add Classes</h2>
        </div>
        <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
          <form onSubmit={formik.handleSubmit}>
            <div className="ace-admin-fixtures-add-fixture-fixture-container">
              <div style={{ paddingBottom: "4rem" }}></div>

              <DropDown
                bg={{ background: " #2B2D30" }}
                text={"Class"}
                options={optionOfClasses}
                selected={selectedClass}
                setSelected={setSelectedClass}
              />
              <InputValue
                text={"Title"}
                bg={{ background: " #2B2D30" }}
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="formikError">{formik.errors.title}</div>
              ) : null}
              <div style={{ margin: "1.5rem 0 " }}>
                <div className="ace-admin-objectives-add-new_trainig-image-text">
                  <p style={{ marginBottom: "0rem" }}>Add Video</p>
                  <div></div>
                </div>
                <div className="ace-admin-objectives-add-new_trainig-image-text">
                  <img src={dummyImage} />
                </div>
              </div>
              <div style={{ padding: "13.9rem 0 8.2rem 0" }}>
                <SubmitButton text={"Add Class"} isloading={isloading} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClassInPremium;
