import React, { useState, useRef } from "react";
import "./EditProfile.css";
import profileImage from "../static/team-profile-pic.png";
import { Upload, Modal } from "antd";
import ImgCrop from "antd-img-crop";
import { useNavigate } from "react-router-dom";
import InputValue from "../../../../../smallComponets/Input/Input";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import axios from "axios";
import { useLocation } from "react-router-dom";
import camIcon from "./Static/cam-icon.png";
import * as Yup from "yup";
import { GeneralFetch } from "../../../../../Api/ApiCaller";
import Route from "../../../../../Api/Route";
import { GreenNotification } from "../../../smallComponents/Notification/Notification";

const EditProfile = () => {
  const [isloading, setIsloading] = useState(false);
  const data = useSelector((data) => data.Data.userData);
  const [image, setImage] = useState("");
  const [imagefile, setImageFile] = useState({});
  const fileRef = useRef(null);
  const Navigate = useNavigate();
  const { state } = useLocation();
  const onChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const updateProfile = (name, bio) => {
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
                id: state?.item?._id,
                name: name,
                bio: bio,
                image: image,
                name: name,
              };
              const getProfileRes = (res) => {
                console.log("team update", res);
                GreenNotification(
                  "Profile Team",
                  `Profile Picture of ${res.name} is Successfully Updated. `
                );
                Navigate("/dashboard/team");
              };
              GeneralFetch(
                data.token,
                "POST",
                Route.CoachTeamUpdate,
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
      teamName: state?.item?.name,
      bio: state?.item?.bio,
    },
    validationSchema: Yup.object({
      teamName: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      bio: Yup.string()
        .max(250, "Must be 50 characters or less")
        .required("Required"),
    }),

    onSubmit: (val) => {
      updateProfile(val.teamName, val.bio);
    },
  });

  return (
    <div className="ace-admin-adminHome-main_container">
      <div className="ace-admin-team-edit-profile-heading_contianer">
        <h1>Edit Team Profile</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="ace-admin-team-edit-profile-edit_mainContainer">
          {/* <img src={profileImage} /> */}
          <div style={{ padding: "2.8rem 0 0 0" }}>
            <div className="ace-admin-edit_profile-picture-main_container">
              <img src={image ? image : state?.item?.image} />
              <div
                className="ace-admin-edit_profile-picture-icon_container"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <img src={camIcon} />
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
          </div>
          <div>
            <InputValue
              bg={{ background: "#2B2D30" }}
              text={"Team Name"}
              id="teamName"
              name="teamName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.teamName}
            />
          </div>
          <div>
            <InputValue
              bg={{ background: "#2B2D30" }}
              text="Bio"
              id="bio"
              name="bio"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
            />
          </div>
          <div style={{ padding: "9rem 0 4.1rem 0" }}>
            <SubmitButton text={"Update"} isloading={isloading} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
