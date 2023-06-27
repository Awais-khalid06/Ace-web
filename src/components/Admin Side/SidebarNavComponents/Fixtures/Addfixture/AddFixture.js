import React, { useEffect, useState } from "react";
import InputValue from "../../../../../smallComponets/Input/Input";
import TopMainHeading from "../../../smallComponents/TopMainHeading/TopMainHeading";
import "./AddFixture.css";
import teamimg from "./static/fixture-image1.png";
import { DatePicker, Space, TimePicker } from "antd";
import arrowRight from "./static/Arrow - Left 2.png";
import arrowLeft from "./static/Arrow - Left 4.png";
import moment from "moment";
import AdminsideBtn from "../../../smallComponents/AdminSidebtn/AdminsideBtn";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";

import LineUpAdd from "../../Team/LineUp/LineUpAdd/LineUpAdd";
import TeamNamepicRight from "../components/TeamNamepicRight/TeamNamepicRight";
import TeamsInModal from "../components/TeamInModal/TeamsInModal";
import { AddFixtureId } from "../../../../../Redux/ACEDataSlice";

const AddFixture = () => {
  const Navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectTeams, setSelectTeams] = useState([]);
  const [fixtureId, setFixtureId] = useState();
  const [team, setTeam] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const token = useSelector((data) => data.Data.userData.token);
  let disPatch = useDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const selectedTeam = (item) => {
    setIsModalOpen(false);
    setTeam(item);
  };

  const addFixture = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      teamTwo: team._id,
      fixtureTime: moment(date + "" + time),
      teamOneLineup: [],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/fixtures/add",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        disPatch(AddFixtureId(result._id));
        //console.log("result----", result);
        Navigate("/dashboard/fixtures/lineUpFixture");
      })
      .catch((error) => console.log("error", error));
  };

  const totalTeams = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      currentPage: 1,
      pageSize: 5,
      search: "",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/teams/searchTeam",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("teams==>", result.data);
        setSelectTeams(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const onChange = (date, dateString) => {
    //console.log(date._d, dateString);
    setDate(dateString);
  };
  const onChangeTime = (date, dateString) => {
    //console.log(date._d, dateString);
    setTime(dateString);
  };

  useEffect(() => {
    totalTeams();
  }, []);

  const NextIcon = () => {
    return (
      <div className="ace-calnder-next-icon-main_container">
        <img src={arrowRight} />
      </div>
    );
  };

  const PretIcon = () => {
    return (
      <div className="ace-calnder-pre-icon-main_container">
        <img src={arrowLeft} />
      </div>
    );
  };
  // const continueToNext = () => {};
  const completeDate = () => {
    console.log(moment(date + "" + time)._i);
  };

  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div
          className="ace-admin-fixtures-add-fixture-main-heading"
          onClick={completeDate}
        >
          <h2>Fixture</h2>
        </div>
        {/* <div></div> */}
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <div className="ace-admin-fixtures-add-fixture-new-fixture">
          <h2>New Fixture</h2>
          <div></div>
        </div>
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <div className="ace-admin-fixtures-add-fixture-team-profile_container">
            <img src={teamimg} />
            <h2>Your Team Name</h2>
          </div>

          <div
            className="ace-admin-fixture-add-fixture-team_select-btn"
            onClick={openModal}
          >
            <h2>Select Team</h2>
          </div>

          <div className="ace-admin-fixtures-add-fixture-with">
            <h2>with</h2>
            <div></div>
          </div>
          {team.image ? (
            <div className="ace-admin-fixtures-add-fixture-team-profile_container">
              {team.image && <img src={team.image} />}
              <h2>{team.name}</h2>
            </div>
          ) : (
            <div className="ace-admin-fixtures-add-fixture-no-selected-text">
              <h1>No team Selected</h1>
            </div>
          )}

          {/* <InputValue bg={{ background: "#2B2D30" }} text={"with"} /> */}
          <div style={{ marginTop: "0rem", marginBottom: "8rem" }}>
            <div className="ace-admin-fixtures-add-fixture-with">
              <h2>When</h2>
              <div></div>
            </div>
            <DatePicker
              style={{ background: "red" }}
              onChange={onChange}
              nextIcon={<NextIcon />}
              prevIcon={<PretIcon />}
              showToday={false}
            />
          </div>
          <div className="ace-admin-fixtures-add-fixture-with">
            <h2>Start Time</h2>
            <div></div>
          </div>
          <TimePicker onChange={onChangeTime} />
          <div style={{ margin: "4.2rem 0 2.4rem 0" }}>
            <AdminsideBtn text={"Continue"} onClick={addFixture} />
          </div>
        </div>
      </div>
      <Modal
        // style={{ overflowY: "hidden", position: "relative" }}
        //   title="Basic Modal"
        open={isModalOpen}
        //   onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectTeams.map((item) => {
          return <TeamsInModal item={item} selectedTeam={selectedTeam} />;
        })}
      </Modal>
    </div>
  );
};

export default AddFixture;
