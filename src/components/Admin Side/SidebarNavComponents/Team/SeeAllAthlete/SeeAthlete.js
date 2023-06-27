import React, { useEffect, useState } from "react";
import AthleteView from "../../../smallComponents/AthleteView/AthleteView";
import "./SeeAthlete.css";
import { useSelector } from "react-redux";
import { GeneralFetch } from "../../../../../Api/ApiCaller";
import Route from "../../../../../Api/Route";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const SeeAthlete = () => {
  const [isloading, setIsLoading] = useState(false);
  const [athlete, setAthlete] = useState([]);
  const [athleteRemoveRes, setAthleteRemoveRes] = useState({});
  const token = useSelector((data) => data.Data.userData.token);
  const Navigate = useNavigate();

  const openNotification = (name) => {
    notification.open({
      message: "Remove Athlete",
      description: ` ${name} is successfully Removed from your Team.`,
      // className: "notificationDesign",
      style: { color: "#fff", background: "green" },
    });
  };

  const getData = (res) => {
    setAthlete(res);
  };

  const removeAhlete = (id) => {
    let body = {
      id: id,
    };

    const getRes = (res) => {
      setAthleteRemoveRes(res);
      openNotification(res.name);
    };

    GeneralFetch(
      token,
      "POST",
      Route.removeAthlete,
      body,
      setIsLoading,
      getRes,
      (error) => {}
    );
  };

  const getAthletes = () => {
    GeneralFetch(
      token,
      "POST",
      Route.GetTeamAthlete,
      null,
      setIsLoading,
      getData,
      (error) => {}
    );
  };

  const viewAthlete = (id) => {
    Navigate("/dashboard/team/AthleteProfile", {
      state: {
        athleteId: id,
      },
    });
  };

  useEffect(() => {
    getAthletes();
  }, [athleteRemoveRes]);
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Athletes in team</h2>
        </div>
      </div>
      <div className="ace-listings-add_new_listing-container">
        <h2>Remove Athletes from Team and View</h2>
        <div></div>
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <div style={{ margin: "2.5rem 0 0 0" }}></div>
          {athlete.map((item) => {
            return (
              <AthleteView
                item={item}
                removeAhlete={removeAhlete}
                viewAthlete={viewAthlete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeeAthlete;
