import React, { useState, useEffect, useRef } from "react";
import duumyProfile from "../static/dummy-profile.png";
import camicon from "../static/cam-icon.png";
import "./EditCoachProfile.css";
import InputValue from "../../../../../smallComponets/Input/Input";
import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GeneralFetch } from "../../../../../Api/ApiCaller";
import Route from "../../../../../Api/Route";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { GreenNotification } from "../../../smallComponents/Notification/Notification";
import { useDispatch } from "react-redux";
import { userData } from "../../../../../Redux/ACEDataSlice";
const EditCoachProfile = () => {
  const data = useSelector((data) => data.Data.userData);
  const { state } = useLocation();
  const Navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [image, setImage] = useState("");
  const [imagefile, setImageFile] = useState({});
  const disPatch = useDispatch();
  const fileRef = useRef(null);

  const onChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const updateProfile = (name) => {
    setIsloading(true);
    let file = imagefile;

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
        const options = {
          headers: {
            "Content-Type": file.type,
          },
        };
        try {
          console.log("GOING: ", res.data.url, file, options);

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

              let body = {
                name: name,
                profileImage: image,
              };
              const getProfileRes = (res) => {
                console.log("res of image upload", res);
                disPatch(
                  userData({
                    ...data,
                    profileImage: res.profileImage,
                    name: res.name,
                  })
                );
                GreenNotification(
                  "Profile Update",
                  `Profile Picture of ${res.name} is Successfully Updated. `
                );
                Navigate("/dashboard/AdminHome");
              };
              GeneralFetch(
                data.token,
                "POST",
                Route.profileUpdate,
                body,
                setIsloading,
                getProfileRes,
                (error) => {}
              );
            })
            .catch((err) => {
              console.log("Err: ", err);
            });
          // let s3Url = https://try-s3-upload-plz.s3.us-east-2.amazonaws.com + res.data.key
          // console.log("RES: ", resp);
        } catch (error) {
          console.log("ERROR in uploading", error);
        }
      })
      .catch((err) => console.log("ERR in getting url: ", err));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
    }),
    onSubmit: (val) => {
      updateProfile(val.name);
      // state.update();
    },
  });

  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Edit Coach Profile</h2>
        </div>
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="ace-admin-fixtures-add-fixture-fixture-container">
            <div className="ace-admin-edit_profile-picture-main_container">
              <img src={image ? image : data.profileImage} />
              <div
                className="ace-admin-edit_profile-picture-icon_container"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <img src={camicon} />
              </div>
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

            <InputValue
              text={"Name"}
              bg={{ background: " #2B2D30" }}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <div style={{ padding: "3.2rem" }}>
              <SubmitButton text={"Continue"} isloading={isloading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoachProfile;
