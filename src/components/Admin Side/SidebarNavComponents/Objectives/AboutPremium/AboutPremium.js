import React, { useRef, useState } from "react";
import DropDown from "../../../../../smallComponets/Input/DropDown/DropDown";
import InputValue from "../../../../../smallComponets/Input/Input";
import { optionsOfTraningLevel } from "../optionOfDropDown/OptionOfDropDown";
import TextAreaView from "../smallcomponents/TextArea/TextArea";
import { useLocation } from "react-router-dom";

import ImageUploading from "react-images-uploading";
import uploadIcon from "./../static/upload_icon.png";
import dummyImage from "./../static/dummy-image.png";
import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { notification } from "antd";

const AboutPremium = () => {
  const Navigate = useNavigate();
  const data = useSelector((data) => data.Data.userData);

  const [selectedTrainingLevel, setSelectedTrainingLevel] = useState({
    label: "Expert",
    value: "0",
  });
  const { state } = useLocation();
  const [isloading, setIsloading] = useState(false);
  const [updateIndex, setUpdateIndex] = useState("");
  const [images, setImages] = React.useState("");

  const openNotification = () => {
    notification.open({
      message: "New Traning",
      description: "Add new traning successfully",
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

  const maxNumber = 1;

  const onChange = (file) => {
    // data for submit
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImages(reader.result);
    };
  };

  const addPremiumObject = (desciption, title) => {
    setIsloading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      objectiveType: "premium",
      category: state.categoryId,
      trainingSection: state.categorySessionId,
      // trainingSection: "",
      title: title,
      description: desciption,
      featuredImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      aboutYourself: state.aboutYourself,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/objectives/add",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        try {
          if (result.message) {
            setIsloading(false);
            openNotification2(result.message);
            // Navigate("/dashboard/fixtures");
          }

          if (!result.message) {
            setIsloading(false);
            openNotification();
            Navigate("/dashboard/objectives/aboutClassInPremium", {
              state: {
                objectiveId: result._id,
              },
            });
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

      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),

      description: Yup.string()
        .max(300, "Must be 300 characters or less")
        .required("Required"),
    }),
    onSubmit: (val) => {
      addPremiumObject(val.description, val.title);
    },
  });

  const fileRef = useRef(null);
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>About Premium</h2>
        </div>
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <form onSubmit={formik.handleSubmit}>
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

            <TextAreaView
              text={"Description"}
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="formikError">{formik.errors.description}</div>
            ) : null}

            <div className="upload__image-wrapper-main_container">
              <div className="upload__image-wrapper">
                <div style={{ margin: "1.5rem 0 " }}>
                  <div className="ace-admin-objectives-add-new_trainig-image-text">
                    <p style={{ marginBottom: "0rem" }}>Featured Image</p>
                    <div></div>
                  </div>
                  <div className="ace-admin-objectives-add-new_trainig-image-text">
                    <img
                      onClick={() => {
                        fileRef.current.click();
                      }}
                      src={images ? images : dummyImage}
                    />
                  </div>
                  <input
                    onChange={(event) => {
                      onChange(event.target.files[0]);
                    }}
                    ref={fileRef}
                    hidden
                    type={"file"}
                    accept="image/*"
                  />
                </div>

                <div style={{ padding: "8.4rem 0 3.2rem 0" }}>
                  <SubmitButton
                    // onClick={moveToNextScreen}
                    text={"Continue"}
                    isloading={isloading}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutPremium;
