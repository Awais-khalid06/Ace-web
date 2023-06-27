import React, { useState, useRef, useEffect } from "react";
import DropDown from "../../../../../smallComponets/Input/DropDown/DropDown";
import InputValue from "../../../../../smallComponets/Input/Input";
import "./EditTrainingClass.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import dummyImage from "./dummy-video.png";
import axios from "axios";
import deletIcon from "./trash-2.png";
import editIcon from "./edit-card.png";
import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import TrainingPlanCardDetials from "../smallcomponents/TrainingPlanCard/TrainingPlanCardDetails/TrainingPlanCardDetials";
import {
  GreenNotification,
  RedNotification,
} from "../../../smallComponents/Notification/Notification";
import { GeneralFetch } from "../../../../../Api/ApiCaller";
import Route from "../../../../../Api/Route";
import Loader from "../../../smallComponents/Loader/Loader";
import { RemoveItemFromArray } from "../../../../Commons/common";
var currentIndex = 1;

const EditClassTraining = () => {
  const { state } = useLocation();
  const Navigate = useNavigate();
  const [objectiveDetials, setObjectiveDetials] = useState({});
  const [isAddClass, setIsAddClass] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const data = useSelector((data) => data.Data.userData);
  const [imagefile, setImageFile] = useState();
  const [image, setImage] = useState("");
  const fileRef = useRef(null);
  const [weekNumber, setweekNumber] = useState("");
  const [weeks, setWeeks] = useState([]);
  const [addNewWeeks, setaddNewWeeks] = useState([]);
  const [tickets, settickets] = useState(1);
  const hiddeTicket = () => setIsAddClass(!isAddClass);
  const [title, settitle] = useState("");
  const [isedit, setisedit] = useState(false);
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
      message: "ACE Update Class",
      description: value,
      // className: "notificationDesign",
      style: { color: "#fff", background: "red" },
    });
  };

  const getSingleObjective = (flag) => {
    let body = {
      id: state.id,
    };

    const getRes = (res) => {
      setObjectiveDetials(res);
      setWeeks(res?.classes);
      flag == true ? hiddeTicket() : console.log("deletTraing", res);
    };

    GeneralFetch(
      data.token,
      "POST",
      Route.getSingleObjective,
      body,
      setIsloading,
      getRes,
      (error) => {}
    );
  };

  const UpdateClass = (obj) => {
    let body = obj;

    const getRes = (res) => {
      console.log("RESPONSE update ==> ", res);
      GreenNotification("Add Class Successfully");
      getSingleObjective(true);
      settitle("");
      setImageFile("");
      setweekNumber("");
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

  const addOReditClass = (title, flag) => {
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

              if (flag == true) {
                GeneralFetch(
                  data.token,
                  "POST",
                  Route.editClass,
                  {
                    id: selectedWeek?.id,
                    objective: selectedWeek?.objective,
                    week: weekNumber,
                    title: title,
                    video: videlink,
                  },
                  setIsloading,
                  (res) => {
                    console.log("reshh ", res);
                    GreenNotification("edit successfully");
                  },
                  (error) => {}
                );
              } else {
                UpdateClass([
                  {
                    objective: state.id,
                    video: videlink,
                    title: title,
                    week: weeks?.length + 1,
                  },
                ]);
              }

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
  };
  const addClassInTraining = (title) => {
    console.log("title", title);
    if (!title) return RedNotification("Plzz Enter title");
    if (!imagefile)
      return RedNotification("Plzz select video from your system.");
    if (!weekNumber) return RedNotification("Plzz enter week number.");
    else {
      setIsloading(true);
      if (isedit == true) {
        if (
          title == selectedWeek?.title &&
          weekNumber == selectedWeek?.week &&
          imagefile == selectedWeek?.video
        ) {
          hiddeTicket();
          GreenNotification("No change found");
        } else if (imagefile != selectedWeek?.video) {
          addOReditClass(title, true);
        } else {
          console.log("==??>> ", selectedWeek);
          GeneralFetch(
            data.token,
            "POST",
            Route.editClass,
            {
              id: selectedWeek?.id,
              objective: selectedWeek?.objective,
              week: weekNumber,
              title: title,
              video: imagefile,
            },
            setIsloading,
            (res) => {
              console.log("reshh ", res);
              GreenNotification("edit successfully");
            },
            (error) => {}
          );
        }
      } else addOReditClass(title, false);
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
        //addClassInTraining(val.title);
      }
    },
  });
  let selectedWeek = null;
  const Renderweeks = ({ item, index }) => {
    let deleteWeek = () => {
      RemoveItemFromArray(weeks, item, setWeeks);
      RemoveItemFromArray(addNewWeeks, item, setaddNewWeeks);
      item?._id &&
        GeneralFetch(
          data.token,
          "POST",
          Route.deleteObjectiveClass,
          { id: item?._id },
          setIsloading,
          (e) => {
            GreenNotification("Week delete successfully");
          },
          (error) => {}
        );
    };
    let editWeek = () => {
      selectedWeek = {
        objective: item?.objective,
        video: item?.video,
        title: item?.title,
        week: index + 1,
        id: item?._id,
      };
      setImageFile(item?.video);
      settitle(item?.title);
      setweekNumber(`Week ${item?.week}`);
      hiddeTicket();
      setisedit(true);
    };
    return (
      <div className="ace-admin-objectives-edit-session-edit-video-container">
        <h2>{item?.title}</h2>
        <div className="ace-admin-objectives-edit-session-edit-container">
          <img onClick={deleteWeek} src={deletIcon} />
          <img onClick={editWeek} src={editIcon} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    getSingleObjective();
    console.log("weeeeeeeeeeeeks ==>  ", weeks);
  }, []);

  return (
    console.log("cuurent index", currentIndex),
    (
      <div className="ace-admin-team_main-container">
        <div className="ace-admin-fixtures-main-heading_container">
          <div className="ace-admin-fixtures-add-fixture-main-heading">
            <h2>Update Classes</h2>
          </div>
          <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
            <form onSubmit={formik.handleSubmit}>
              <div className="ace-admin-fixtures-add-fixture-fixture-container">
                <div style={{ paddingBottom: "4rem" }}></div>
                {isloading ? (
                  <Loader marginVetical={{ top: "150px", bottom: "180px" }} />
                ) : (
                  <>
                    {/* <DropDown
                bg={{ background: " #2B2D30" }}
                text={`Week`}
                options={optionOfWeeks}
                selected={selectedWeek}
                setSelected={setSelectedWeek}
              /> */}
                    <TrainingPlanCardDetials
                      image={objectiveDetials?.featuredImage}
                      title={objectiveDetials?.title}
                      description={objectiveDetials?.description}
                    />
                    {isAddClass ? (
                      <>
                        <div style={{ flexWrap: "wrap" }}>
                          {weeks?.map((item, index) => {
                            return <Renderweeks index={index} item={item} />;
                          })}
                        </div>

                        <div className="ace-admin-objectives-add_week-ticket-container">
                          <button
                            type="submit"
                            className="ace-admin-objectives-add_more-btn"
                            onClick={() => {
                              hiddeTicket();
                              currentIndex = tickets + 1;
                            }}
                          >
                            Add More
                          </button>

                          <button
                            type="submit"
                            className="ace-admin-objectives-add_more-btn"
                            onClick={() => Navigate("/dashboard/objectives")}
                          >
                            Update Class
                          </button>
                        </div>
                        <div style={{ marginTop: "2rem" }}></div>
                      </>
                    ) : (
                      <>
                        <InputValue
                          text={"Week"}
                          bg={{ background: " #2B2D30" }}
                          id="weekNumber"
                          name="weekNumber"
                          placeholder="Enter week number"
                          type="text"
                          onChange={(val) =>
                            setweekNumber(val.currentTarget.value)
                          }
                          onBlur={formik.handleBlur}
                          value={weekNumber}
                        />
                        <InputValue
                          placeholder="Enter video title"
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
                            <div className="formikError">
                              {formik.errors.input}
                            </div>
                          ) : null}
                          {imagefile ? (
                            <h2
                              style={{ color: "#82EF00", fontSize: "1.2rem" }}
                            >
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
                              //   hiddeTicket();
                              addClassInTraining(title);
                            }}
                          />
                        </div>
                      </>
                    )}
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

export default EditClassTraining;
