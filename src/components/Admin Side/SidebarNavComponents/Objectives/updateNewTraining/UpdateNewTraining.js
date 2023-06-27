import React, { useState, useEffect } from "react";
import DropDown from "../../../../../smallComponets/Input/DropDown/DropDown";
import TopMainHeading from "../../../smallComponents/TopMainHeading/TopMainHeading";
import {
  optiionOfTechnique,
  optiionsOfTraningPlan,
  optiionsOfTraningsession,
} from "../optionOfDropDown/OptionOfDropDown";
import TrainingChoseBtn from "../smallcomponents/TrainngChoseBtn/TrainingChoseBtn";
import { useFormik } from "formik";

import AdminsideBtn from "../../../smallComponents/AdminSidebtn/AdminsideBtn";
import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import { useNavigate } from "react-router-dom";
import TextAreaView from "../smallcomponents/TextArea/TextArea";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import DropDownObjectives from "../../../../../smallComponets/Input/DropDown/DropDownObjectives";
import { GeneralFetch } from "../../../../../Api/ApiCaller";
import Route from "../../../../../Api/Route";

const UpdateNewTraining = () => {
  const data = useSelector((data) => data.Data.userData);
  const Navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [trainingPlan, setTrainingPlan] = useState([]);
  const [previousData, setPreviousData] = useState({});
  const { state } = useLocation();
  console.log("id", state.id);
  const [trainingSession, setTrainingSession] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [selected, setSelected] = useState({
    title: "Select option",
    _id: previousData?.category,
  });
  const [selectedTraningPlan, setSelectedTraningPlan] = useState({
    title: "Select option",
    _id: previousData?.plan,
  });
  const [selectedTraningSession, setSelectedTraningSession] = useState({
    title: "Select option",
    _id: previousData?.trainingSection,
  });

  const objectiveForEdit = () => {
    let body = {
      id: state.id,
    };

    const getRes = (res) => {
      console.log("objectiveData", res);
      // setAthleteProfile(res);
      setPreviousData(res);
    };

    GeneralFetch(
      data.token,
      "POST",
      Route.editObjectives,
      body,
      setIsloading,
      getRes,
      (error) => {}
    );
  };

  const getAllCategory = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      isTrain: true,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/objCategories/all",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setCategory(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getTrainingPlan = (option) => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      category: option._id,
      isTrain: true,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/objPlans/getCategoryPlans",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("getTraingPlan", result);
        setTrainingPlan(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getTraningSession = (option) => {
    // if (selectedTraningPlan.title !== "Select option") {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      plan: option._id,
      isTrain: true,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/objSections/getPlanSections",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("gettingPlanSesstion", result);
        setTrainingSession(result);
      })
      .catch((error) => console.log("error", error));
    // }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      message: previousData?.aboutYourself,
    },

    onSubmit: (val) => {
      moveToNextScreen(val.message);
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Required"),
    }),
  });

  const moveToNextScreen = (val) => {
    console.log("inscreen", selectedTraningSession._id);

    Navigate("/dashboard/objectives/updatePhotoTraining", {
      state: {
        id: state.id,
        categoryId: selected._id,
        trainingPlanId: selectedTraningPlan._id,
        trainSectionId: selectedTraningSession._id,
        aboutYourself: val,
        previousData: previousData,
      },
    });
  };

  useEffect(() => {
    getAllCategory();
    objectiveForEdit();
  }, []);

  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Update Training</h2>
        </div>
        {/* <div></div> */}
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <form onSubmit={formik.handleSubmit}>
            <div style={{ marginTop: "2rem" }}></div>
            <div>
              <DropDownObjectives
                bg={{ background: " #2B2D30" }}
                text={"Category"}
                options={category}
                selected={selected}
                setSelected={(option) => {
                  setSelected(option);
                  getTrainingPlan(option);
                }}
              />
            </div>
            <div style={{ marginTop: "2rem" }}>
              <DropDownObjectives
                bg={{ background: " #2B2D30" }}
                text={"Traning Plan"}
                options={trainingPlan}
                selected={selectedTraningPlan}
                setSelected={(option) => {
                  setSelectedTraningPlan(option);
                  getTraningSession(option);
                }}
              />
            </div>

            <div style={{ marginTop: "2rem" }}>
              <DropDownObjectives
                bg={{ background: " #2B2D30" }}
                text={"Training Section"}
                options={trainingSession}
                selected={selectedTraningSession}
                setSelected={setSelectedTraningSession}
              />
            </div>

            <TextAreaView
              text={"About Yourself"}
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

            <div className="ace-admin-objectives-add-new_trainig-btn-container">
              <SubmitButton text={"Continue"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateNewTraining;
