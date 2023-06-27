import React, { useState, useEffect } from "react";
import TopMainHeading from "../../smallComponents/TopMainHeading/TopMainHeading";
import "./Objectives.css";
import PremiumPlanCard from "./smallcomponents/PremiumPlanCard/PremiumPlanCard";
import RegisterAthlete from "./smallcomponents/registarAthlete/RegisterAthlete";
import TrainingPlancard from "./smallcomponents/TrainingPlanCard/TrainingPlancard";
import { useSelector } from "react-redux";
import { GreenNotification } from "../../smallComponents/Notification/Notification";
import { GeneralFetch } from "../../../../Api/ApiCaller";
import Route from "../../../../Api/Route";
import { useNavigate } from "react-router-dom";

const Objectives = () => {
  const data = useSelector((data) => data.Data.userData);
  const [getPremiumApi, setGetPremiumApi] = useState([]);
  const [getTrainApi, setGetTrainiumApi] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [update, setUpdate] = useState(true);
  const Navigate = useNavigate();

  const deleteTrain = (id) => {
    let body = {
      id: id,
    };

    const getRes = (res) => {
      console.log("deletTraing", res);
      setUpdate(!update);
      // setAthleteProfile(res);
      GreenNotification(` ${res.title} raining is Successfully delet.`);
    };

    GeneralFetch(
      data.token,
      "POST",
      Route.deleteObjectives,
      body,
      setIsloading,
      getRes,
      (error) => {}
    );
  };

  const getAllPremium = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/objectives/allByType/premium",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result of premium", result);
        setGetPremiumApi(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getAllTrain = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/objectives/allByType/train",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("getTrain", result);
        setGetTrainiumApi(result);
      })
      .catch((error) => console.log("error", error));
  };

  const updateTraining = (id) => {
    Navigate("/dashboard/objectives/updateNewTraining", {
      state: {
        id: id,
      },
    });
  };
  const editTrainingClass = (id) => {
    Navigate("/dashboard/objectives/editTrainingClass", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    getAllPremium();
    getAllTrain();
  }, [update]);
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <TopMainHeading
          text1="Objectives"
          text2="New Objectives"
          link="/dashboard/objectives/addNewTraining"
        />
      </div>
      <div className="ace-admin-objectives-training-premium-main_container">
        <div className="ace-admin-objectives-my-training-mainContainer">
          <div className="ace-admin-objectives-my-training-text-container">
            <div className="ace-admin-objectives-my-trainig-heading-text">
              <h2>My Trainings</h2>
            </div>
            <div className=""></div>
          </div>
          <div className="ace-admin-objectives-my-training-contianer">
            <div style={{ marginTop: "2.2rem" }}></div>
            {getTrainApi.length !== 0 ? (
              getTrainApi.map((item) => {
                return (
                  <TrainingPlancard
                    item={item}
                    deleteTrain={deleteTrain}
                    updateTraining={updateTraining}
                    editTrainingClass={editTrainingClass}
                  />
                );
              })
            ) : (
              <div className="ace-data-not-available">
                <h2>No Training Plan available!</h2>
              </div>
            )}
          </div>
          <div style={{ margin: "2.9rem 0 1.9rem 0" }}>
            <RegisterAthlete text="Registered Athletes in Trainings" />
          </div>
        </div>
        <div className="ace-admin-objectives-premium-mainContainer">
          <div className="ace-admin-objectives-my-training-text-container">
            <div className="ace-admin-objectives-my-trainig-heading-text">
              <h2>Premium</h2>
            </div>
            <div className=""></div>
          </div>
          <div className="ace-admin-objectives-my-training-contianer">
            <div style={{ marginTop: "1.6rem" }}></div>
            {getPremiumApi.length !== 0 ? (
              getPremiumApi.map((item) => {
                return <PremiumPlanCard item={item} />;
              })
            ) : (
              <div className="ace-data-not-available">
                <h2>No Premium Plan available</h2>
              </div>
            )}
          </div>
          <div style={{ margin: "2.9rem 0 1.9rem 0" }}>
            <RegisterAthlete text="Registered Athletes in Premium" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
