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
import { useSelector } from "react-redux";
import * as Yup from "yup";
import DropDownObjectives from "../../../../../smallComponets/Input/DropDown/DropDownObjectives";

const AddNewPremium = () => {
  const Navigate = useNavigate();
  const data = useSelector((data) => data.Data.userData);
  const [category, setCategory] = useState([]);
  const [categorySession, setCategorySession] = useState([]);
  const [selected, setSelected] = useState({
    title: "Select option",
    _id: "0",
  });

  const [selectedCategorySession, setSelectedCategorySession] = useState({
    title: "Select option",
    _id: "0",
  });
  const moveToNextScreen = (aboutYourself) => {
    Navigate("/dashboard/objectives/aboutPremium", {
      state: {
        categoryId: selected._id,
        categorySessionId: selectedCategorySession._id,

        aboutYourself: aboutYourself,
      },
    });
  };

  const [selectedTraningName, setSelectedTraningName] = useState({
    label: "Technique Plan Name",
    value: "0",
  });

  const getAllCategory = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      isTrain: false,
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

  const getCategorySection = (option) => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      category: option._id,
      isTrain: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/objSections/getCategorySections",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result of Category", result);
        setCategorySession(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      message: "",
    },

    onSubmit: (val) => {
      moveToNextScreen(val.message);
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Required"),
    }),
  });

  return (
    console.log(selected._id, selectedCategorySession._id),
    (
      <div className="ace-admin-team_main-container">
        <div className="ace-admin-fixtures-main-heading_container">
          <div className="ace-admin-fixtures-add-fixture-main-heading">
            <h2>Add New</h2>
          </div>
          {/* <div></div> */}
        </div>
        <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
          <div className="ace-admin-fixtures-add-fixture-fixture-container">
            <div className="ace-admin-fixtures-add-fixture-btn-main_container">
              <TrainingChoseBtn
                link={"/dashboard/objectives/addNewTraining"}
                text={"Trainings"}
                bg={{ background: "#454545" }}
              />
              <TrainingChoseBtn link={"#"} text={"Premium"} />
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <DropDownObjectives
                  bg={{ background: " #2B2D30" }}
                  text={"Category"}
                  options={category}
                  selected={selected}
                  setSelected={(option) => {
                    setSelected(option);
                    getCategorySection(option);
                  }}
                />
              </div>
              <div style={{ marginTop: "2rem" }}>
                <DropDownObjectives
                  bg={{ background: " #2B2D30" }}
                  text={"Traning Plan"}
                  options={categorySession}
                  selected={selectedCategorySession}
                  setSelected={(option) => {
                    setSelectedCategorySession(option);
                  }}
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
    )
  );
};

export default AddNewPremium;
