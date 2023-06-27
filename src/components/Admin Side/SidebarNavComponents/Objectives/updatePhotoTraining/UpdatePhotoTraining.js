import React, { useState, useRef } from "react";
import DropDown from "../../../../../smallComponets/Input/DropDown/DropDown";
import InputValue from "../../../../../smallComponets/Input/Input";
import {
  optionsOfEquipment,
  optionsOfTraningLevel,
} from "../optionOfDropDown/OptionOfDropDown";
import TextAreaView from "../smallcomponents/TextArea/TextArea";

import ImageUploading from "react-images-uploading";
import uploadIcon from "./../static/upload_icon.png";
import dummyImage from "./../static/dummy-image.png";
import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";
import { notification } from "antd";
import axios from "axios";
import { RedNotification } from "../../../smallComponents/Notification/Notification";

const UpdatePhotoTraining = () => {
  const data = useSelector((data) => data.Data.userData);

  const Navigate = useNavigate();
  const { state } = useLocation();
  const fileRef = useRef(null);
  const [imagefile, setImageFile] = useState();
  const [selectedTrainingLevel, setSelectedTrainingLevel] = useState({
    label: state.previousData?.level,
    value: "0",
  });

  const [selectedEquipment, setSelectedEquipment] = useState({
    label: state.previousData?.equipment,
    value: "0",
  });

  const [isloading, setIsloading] = useState(false);
  const [image, setImages] = React.useState("");

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

  const onChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImages(reader.result);
    };
  };

  const addTrainingObject = (desciption, title) => {
    // setIsloading(true);

    let file = imagefile;
    console.log("imagefile", file);
    if (!file) {
      return RedNotification("please select image before update");
    } else {
      setIsloading(true);
      axios
        .post(
          "https://athlete-backend.herokuapp.com/api/admin/media/getImageUploadUrl",
          {
            type: file.type,
            fileName: file.name,
          },
          {
            headers: {
              "x-auth-token": data.token,
            },
          }
        )
        .then(async (res) => {
          console.log("RES: ", res);
          try {
            console.log("GOING: ", res.data.url, file);

            fetch(res.data.url, {
              method: "PUT",
              headers: {
                "Content-Type": file.type,
              },
              body: file,
            })
              .then((response) => {
                setIsloading(false);
                //console.log("Res:", response, res.key);
                let image =
                  "https://try-s3-upload-plz.s3.us-east-2.amazonaws.com/" +
                  res.data.key;

                var myHeaders = new Headers();
                myHeaders.append("x-auth-token", data.token);
                myHeaders.append("Content-Type", "application/json");
                console.log("image", image);
                var raw = JSON.stringify({
                  objectiveType: "train",
                  id: state.id,
                  category: state.categoryId,

                  plan: state.trainingPlanId,
                  trainingSection: state.trainSectionId,
                  title: title,
                  description: desciption,
                  level: selectedTrainingLevel.label,
                  equipment: selectedEquipment.label,
                  featuredImage:
                    image !==
                    "https://try-s3-upload-plz.s3.us-east-2.amazonaws.com/ecart/3202ed20-4fde-11ed-80c3-f1d7b5ef97dcundefined"
                      ? image
                      : state?.previousData?.featuredImage,

                  aboutYourself: state.aboutYourself,
                });

                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow",
                };
                setIsloading(true);
                fetch(
                  "https://athlete-backend.herokuapp.com/api/objectives/update",
                  requestOptions
                )
                  .then((response) => response.json())
                  .then((result) => {
                    console.log("Add Train Object", result._id);

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
              })
              .catch((err) => {
                console.log("Err: ", err);
              });
          } catch (error) {
            console.log("ERROR in uploading", error);
          }
        })
        .catch((err) => console.log("ERR in getting url: ", err));
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: state.previousData?.title,

      description: state.previousData?.aboutYourself,
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
      addTrainingObject(val.description, val.title);
    },
  });

  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Update About Training</h2>
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
            <div className="ace-admin-objectives-add_training-drop_down-container">
              <DropDown
                width={{ width: "14.6rem" }}
                bg={{ background: " #2B2D30", width: "14.6rem" }}
                text={"Training Level"}
                options={optionsOfTraningLevel}
                selected={selectedTrainingLevel}
                setSelected={setSelectedTrainingLevel}
              />
              <DropDown
                width={{ width: "14.6rem" }}
                bg={{ background: " #2B2D30", width: "14.6rem" }}
                text={"Equipment"}
                options={optionsOfEquipment}
                selected={selectedEquipment}
                setSelected={setSelectedEquipment}
              />
            </div>

            <div className="upload__image-wrapper-main_container">
              <div className="upload__image-wrapper">
                <div className="ace-upload__image-wrapper-name-container">
                  <p>Featured Image</p>
                  <div></div>
                </div>

                <div className="ace-admin-objectives-add-new_trainig-image-text">
                  <img
                    onClick={() => {
                      fileRef.current.click();
                    }}
                    src={image ? image : state.previousData?.featuredImage}
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

                <div style={{ padding: "8.4rem 0 3.2rem 0" }}>
                  <SubmitButton text={"Continue"} isloading={isloading} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePhotoTraining;
