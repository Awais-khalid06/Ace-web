import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActiveFixture from "../../Home/components/ActiveFixture";
import SmallBtn from "../components/smallbtn/SmallBtn";
import { Modal } from "antd";
import "./AddPlayer.css";
import profile1 from "../Addfixture/static/profile1-athlete.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const GoalOfPlayerAdd = () => {
  const [teaminfo, setTeamInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamlineUp, setTeamLineUp] = useState([]);
  const [selectPlayer, setSelectedPlayer] = useState({});
  const { state } = useLocation();
  const token = useSelector((data) => data.Data.userData.token);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const slecetPlayerName = (item) => {
    setSelectedPlayer(item);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const goalUpdate = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fixtureId: state.fixtureId,
      teamId: teaminfo._id,
      name: selectPlayer.name,
      athleteId: selectPlayer._id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/fixtures/addGoal",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log("rsesult of goal", result))
      .catch((error) => console.log("error", error));
  };

  const teamInfoUpdate = () => {
    setTeamInfo(state?.teamInfo);
    // console.log("teaminfo", state?.teamInfo);
  };

  const teamLineUpUpdate = () => {
    setTeamLineUp(state?.teamOneLineup);
    // console.log("jjjjjj", state?.teamOneLineup);
  };

  useEffect(() => {
    teamInfoUpdate();
    teamLineUpUpdate();
  }, []);

  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div
          className="ace-admin-fixtures-add-fixture-main-heading"
          //   onClick={completeDate}
        >
          <h2>Add Player</h2>
        </div>
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <ActiveFixture teamOne={teaminfo} />
          <div className="ace-admin-fixtures-add-fixture-fixture-para">
            <h2>Name of the player who goal</h2>
          </div>
          <div style={{ padding: "2.4rem 0" }}>
            <SmallBtn text="Select Player" onClick={handleOpen} />
          </div>
          <div style={{ padding: "2.4rem 0" }}>
            <div className="ace-home-admin-athlete-request-profile_container">
              <img src={profile1} alt="profile-1" />
              <h2>{selectPlayer.name}</h2>
            </div>
          </div>
          <div style={{ padding: "2.4rem 0" }}>
            <SmallBtn text={"Update"} onClick={goalUpdate} />
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel}>
        {teamlineUp.map((item) => {
          return (
            <div className="ace-admin-fixture-add-player-of-goal-main-modal-Container">
              <div className="ace-admin-fixture-add-player-of-goal-main-modal">
                <h2>{item.name}</h2>
              </div>
              <SmallBtn
                text={"Add player"}
                onClick={() => slecetPlayerName(item)}
              />
            </div>
          );
        })}
      </Modal>
    </div>
  );
};

export default GoalOfPlayerAdd;
