import React, { useState, useRef } from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import InputValue from "../../../smallComponets/Input/Input";
import { Upload, Modal } from "antd";
import ImgCrop from "antd-img-crop";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import Footer from "../../../HOC/User Side/footer/Footer";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { useLocation } from "react-router-dom";
import { notification } from "antd";
import { userData } from "../../../Redux/ACEDataSlice";
import camIcon from "./static/cam-icon.png";
import dummyImage from "./static/dummy-profile.png";

const UploadProfile = () => {
  const [isloading, setIsloading] = useState(false);
  const data = useSelector((data) => data.Data.userData);
  const [image, setImage] = useState("");
  const [imagefile, setImageFile] = useState({});
  const fileRef = useRef(null);
  const { state } = useLocation();
  let disPatch = useDispatch();

  const onChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const openNotification = () => {
    notification.open({
      message: "ACE Login",
      description: "You are successfully SignUp.",
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

  const uploadProfileData = (teamName, Bio) => {
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
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJkODNjZTRmMGFmNzM4YTQ3YzFkOGIiLCJyb2xlIjoiY29hY2giLCJuYW1lIjoiQXdhaXMxMjciLCJlbWFpbCI6ImF3YWlzMTI3QGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6IjAzOTA5NDkzIiwiaWF0IjoxNjY2MDI2MDMzfQ.-pQ4vafGeysbdzZ1VyFLSKxPv_pq2UpdVd7fgZXZ4p8",
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

              var myHeaders = new Headers();
              myHeaders.append("x-auth-token", "");
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                name: state.name,
                email: state.email,
                password: state.password,
                role: "coach",
                ageGroup: state.ageGroup,
                gender: state.gender,
                sport: state.sport,
                mobileNumber: state.mobileNumber,
                teamName: teamName,
                bio: Bio,
                image: image,
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };
              //setIsloading(true);
              fetch(
                "https://athlete-backend.herokuapp.com/api/user/coachSignup",
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                  //console.log("1st ", result);
                  try {
                    setIsloading(false);
                    //console.log("result", result);
                    // setLoginMsg(result.message);
                    if (result.message) {
                      setIsloading(false);
                      openNotification2(result.message);
                    }

                    if (!result.message) {
                      setIsloading(false);
                      openNotification();

                      disPatch(userData(result.user));
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
  };
  //console.log("imageurl", fileList[0].thumbUrl ? fileList[0].thumbUrl : null);

  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      teamName: "",
      bio: "",
    },
    validationSchema: Yup.object({
      teamName: Yup.string()
        .max(30, "Must be 30 word or less")
        .required("Required"),
      bio: Yup.string()
        .max(150, "Must be 150 word or less")
        .required("Required"),
    }),

    onSubmit: (val) => {
      uploadProfileData(val.teamName, val.bio);
    },
  });
  return (
    <div className="ace__container">
      <NavBar />
      <form onSubmit={formik.handleSubmit}>
        <div className="ace-forgetPasswordEmail-iunput-container">
          <h1>Complete Team Profile</h1>

          <p className="ace-forgetPasswordEmail-iunput-para"></p>
          <div>
            {/* image */}
            <div className="ace-admin-edit_profile-picture-main_container">
              <img src={image ? image : dummyImage} />
              <div
                className="ace-admin-edit_profile-picture-icon_container"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <img src={camIcon} />
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
          </div>

          <InputValue
            text="Team Name"
            id="teamName"
            name="teamName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.teamName}
          />
          {formik.touched.teamName && formik.errors.teamName ? (
            <div className="formikError">{formik.errors.teamName}</div>
          ) : null}
          <InputValue
            text="Bio"
            id="bio"
            name="bio"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bio}
          />
          {formik.touched.bio && formik.errors.bio ? (
            <div className="formikError">{formik.errors.bio}</div>
          ) : null}

          <div
            style={{
              margin: "11.3rem 0 11rem 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SubmitButton
              // onClick={uploadProfileData}
              text={"Send"}
              isloading={isloading}
            />
            {/* {isloading ? <Spiner /> : null} */}
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default UploadProfile;
