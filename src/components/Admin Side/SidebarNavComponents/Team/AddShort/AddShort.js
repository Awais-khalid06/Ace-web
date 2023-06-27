import React, { useState, useEffect, useRef } from "react";
import InputValue from "../../../../../smallComponets/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TagsInput } from "react-tag-input-component";
import "./AddShort.css";
import dummyImage from "../static/dummy-video.png";
import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import DropDown from "../../../../../smallComponets/Input/DropDown/DropDown";
import { optionOfWeeks } from "../../Objectives/optionOfDropDown/OptionOfDropDown";
import axios from "axios";

const AddShort = () => {
  const [selected, setSelected] = useState(["creative"]);
  const [selectedWeek, setSelectedWeek] = useState({
    label: "Goals",
    value: "634507f4a341720c42d510fb",
  });
  const [category, setCategory] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const { state } = useLocation();
  const Navigate = useNavigate();
  const [imagefile, setImageFile] = useState({});
  const [image, setImage] = useState("");
  const fileRef = useRef(null);
  const token = useSelector((data) => data.Data.userData.token);

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
      message: "Video Upload",
      description: `Video Upload successfully.`,
      // className: "notificationDesign",
      style: { color: "#fff", background: "green" },
    });
  };

  const uploadVideo = (title) => {
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
              let videolink =
                "https://try-s3-upload-plz.s3.us-east-2.amazonaws.com/" +
                res.data.key;

              var myHeaders = new Headers();
              myHeaders.append("x-auth-token", token);
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                shortType: state.shortType,
                category: category.value,
                title: title,
                tags: selected,
                video: videolink,
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };
              setIsloading(true);
              fetch(
                "https://athlete-backend.herokuapp.com/api/shorts/add",
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                  console.log(result);
                  setIsloading(false);
                  openNotification();
                  Navigate("/dashboard/team");
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

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
    }),
    onSubmit: (val) => {
      uploadVideo(val.name);
    },
  });

  const getCategory = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/shortCategories/all",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCategory(
          result.map((item) => {
            return {
              label: item.title,
              value: item._id,
            };
          })
        );
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Add Short</h2>
        </div>
      </div>
      <div className="ace-listings-add_new_listing-container">
        <h2>Team Highlights</h2>
        <div></div>
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="ace-admin-fixtures-add-fixture-fixture-container">
            <div style={{ marginTop: "1rem" }}></div>
            <InputValue
              text={"Video Title"}
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

            <DropDown
              bg={{ background: " #2B2D30" }}
              text={"Category"}
              options={category}
              selected={selectedWeek}
              setSelected={setSelectedWeek}
            />
            <div className="ace-admin-tags-main-contaner">
              <p>Tags</p>
              <TagsInput
                value={selected}
                onChange={setSelected}
                name="Tags"
                placeHolder="Enter tags"
              />
            </div>

            <div style={{ margin: "1.5rem 0 " }}>
              <div className="ace-admin-objectives-add-new_trainig-image-text">
                <p style={{ marginBottom: "0rem" }}>Add Video</p>
                <div></div>
              </div>
              <div
                className="ace-admin-objectives-add-new_trainig-image-text"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <img src={dummyImage} />
              </div>
              <input
                onChange={(event) => {
                  onChange(event.target.files[0]);
                }}
                ref={fileRef}
                hidden
                type={"file"}
                accept="video/*"
              />
              {image ? (
                <h2 style={{ color: "#fff" }}>
                  Video is slected from your System.
                </h2>
              ) : null}
            </div>
            <div style={{ padding: "13.9rem 0 8.2rem 0" }}>
              <SubmitButton isloading={isloading} text={"Add Short"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShort;
