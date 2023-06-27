import React, { useState, useRef, useEffect } from "react";
import DropDown from "../../../../../smallComponets/Input/DropDown/DropDown";
import InputValue from "../../../../../smallComponets/Input/Input";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import dummyImage from "./dummy-video.png";
import axios from "axios";
import {
  optionOfWeeks,
  optionsOfTraningLevel,
} from "../optionOfDropDown/OptionOfDropDown";
import "./AddClassTraining.css";
import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import {
  GreenNotification,
  RedNotification,
} from "../../../smallComponents/Notification/Notification";
import { GeneralFetch } from "../../../../../Api/ApiCaller";
import Route from "../../../../../Api/Route";
var currentIndex = 1;

const AddClassTraining = () => {
  const { state } = useLocation();
  const Navigate = useNavigate();
  const [isAddClass, setIsAddClass] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const data = useSelector((data) => data.Data.userData);
  const [imagefile, setImageFile] = useState();
  const [image, setImage] = useState("");
  const fileRef = useRef(null);

  const [weeks, setWeeks] = useState([]);
  const [tickets, settickets] = useState(1);
  const hiddeTicket = () => setIsAddClass(!isAddClass);
  const [title, settitle] = useState("");
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
      message: "New Traning",
      description: "Add traning successfully",
      // className: "notificationDesign",
      style: { color: "#fff", background: "green" },
    });
  };

  const openNotification2 = (value) => {
    notification.open({
      message: "ACE Add Class",
      description: value,
      // className: "notificationDesign",
      style: { color: "#fff", background: "red" },
    });
  };

  const addClass = () => {
    let body = weeks;

    const getRes = (res) => {
      console.log("upcoming Events", res);
      GreenNotification("Add Class Successfully");
      Navigate("/dashboard/objectives");
      currentIndex = 1;
      settickets(1);
    };

    GeneralFetch(
      data.token,
      "POST",
      Route.addClassInTrain,
      body,
      setIsloading,
      getRes,
      (error) => {}
    );
  };

  const addClassInTraining = (title) => {
    console.log("title", title);
    if (!title) return RedNotification("Plzz Enter title");
    if (!imagefile)
      return RedNotification("Plzz select video from your system.");
    else {
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
                let videlink =
                  "https://try-s3-upload-plz.s3.us-east-2.amazonaws.com/" +
                  res.data.key;

                weeks.push({
                  objective: state.objectiveId,
                  video: videlink,
                  title: title,
                  week: currentIndex === 0 ? 1 : currentIndex,
                });
                hiddeTicket();
                console.log("week", weeks);
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
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      input: Yup.string().required("Required"),
    }),
    onSubmit: (val) => {
      {
        console.log(val);
        addClassInTraining(val.title);
      }
    },
  });
  const Renderweeks = ({ index }) => {
    return (
      <div
        style={{ marginBottom: "2rem" }}
        className="ace-admin-objectives-add_week-main_container"
      >
        {/* <div className="ace-admin-objectives-add_week-week_name">
          <h2>Week</h2>
          <div></div>
        </div> */}
        <div
          style={{ cursor: "pointer" }}
          className="ace-admin-objectives-add_week-box-main_container"
          onClick={() => [
            // (currentIndex = index + 1),
            // hiddeTicket()
          ]}
        >
          <h2>{`Week ${index + 1}`}</h2>
        </div>
      </div>
    );
  };
  useEffect(() => console.log("first"), [tickets]);
  return (
    console.log("cuurent index", currentIndex),
    (
      <div className="ace-admin-team_main-container">
        <div className="ace-admin-fixtures-main-heading_container">
          <div className="ace-admin-fixtures-add-fixture-main-heading">
            <h2>Add Classes</h2>
          </div>
          <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
            <form onSubmit={formik.handleSubmit}>
              <div className="ace-admin-fixtures-add-fixture-fixture-container">
                <div style={{ paddingBottom: "4rem" }}></div>
                {/* <DropDown
                bg={{ background: " #2B2D30" }}
                text={`Week`}
                options={optionOfWeeks}
                selected={selectedWeek}
                setSelected={setSelectedWeek}
              /> */}
                {isAddClass ? (
                  <>
                    <div style={{ flexWrap: "wrap" }}>
                      {[...Array(tickets)].map((item, index) => {
                        return <Renderweeks index={index} />;
                      })}
                    </div>

                    <div className="ace-admin-objectives-add_week-ticket-container">
                      <button
                        type="submit"
                        className="ace-admin-objectives-add_more-btn"
                        onClick={() => {
                          settickets(tickets + 1);
                          hiddeTicket();
                          currentIndex = tickets + 1;
                        }}
                      >
                        Add More
                      </button>

                      <button
                        type="submit"
                        className="ace-admin-objectives-add_more-btn"
                        onClick={addClass}
                      >
                        Add Class
                      </button>
                    </div>
                    <div style={{ marginTop: "2rem" }}></div>
                  </>
                ) : (
                  <>
                    <div className="ace-admin-objectives-add_week-main_container">
                      <div className="ace-admin-objectives-add_week-week_name">
                        <h2>Week</h2>
                        <div></div>
                      </div>
                      <div className="ace-admin-objectives-add_week-box-main_container">
                        <h2> Week {currentIndex == 0 ? "1" : currentIndex}</h2>
                      </div>
                    </div>
                    <InputValue
                      text={"Title"}
                      bg={{ background: " #2B2D30" }}
                      id="title"
                      name="title"
                      type="text"
                      onChange={(val) => settitle(val.currentTarget.value)}
                      onBlur={formik.handleBlur}
                      value={title}
                    />
                    {/* {formik.touched.title && formik.errors.title ? (
                      <div className="formikError">{formik.errors.title}</div>
                    ) : null} */}
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
                        id="input"
                        name="input"
                        ref={fileRef}
                        hidden
                        type={"file"}
                        accept="video/*"
                      />
                      {formik.touched.input && formik.errors.input ? (
                        <div className="formikError">{formik.errors.input}</div>
                      ) : null}
                      {image ? (
                        <h2 style={{ color: "#82EF00", fontSize: "1.2rem" }}>
                          Video is slected from your System.
                        </h2>
                      ) : null}
                    </div>

                    <div style={{ padding: "4.9rem 0 8.2rem 0" }}>
                      <SubmitButton
                        isloading={isloading}
                        text={"Save"}
                        onClick={() => {
                          currentIndex = tickets;
                          //hiddeTicket();
                          addClassInTraining(title);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddClassTraining;
