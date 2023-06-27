import React, { useState, useEffect } from "react";
import "./LineUpFixture.css";
import positionImage from "./static/lineUp-imag2.png";
import { Modal } from "antd";
import delet from "./static/icons8-delete-32.png";
import { useSelector, useDispatch } from "react-redux";
import LineUpAdd from "../../Team/LineUp/LineUpAdd/LineUpAdd";
import AdminsideBtn from "../../../smallComponents/AdminSidebtn/AdminsideBtn";
import { useLocation } from "react-router-dom";

const LinUpFixture = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAthlete, setShowAthlete] = useState([]);
  const [athleteCoordinate, setAthleteCoordinate] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [positionUpdate, setPositionUpdate] = useState(true);
  const [getPlayerPosition, setGetPlayerPosition] = useState({});
  const token = useSelector((data) => data.Data.userData.token);
  const fixtureId = useSelector((data) => data.Data.fixtureId);
  const [hover, setHover] = useState(false);
  const { state } = useLocation();
  const [playerPostion, setPlayerPostion] = useState([
    {
      id: 1,
      image: positionImage,
      athletePosition: "attackingMidfielder",
      style: {
        position: "absolute",
        top: "18rem",
        left: "24.5rem",
      },
    },
    {
      id: 2,
      image: positionImage,
      athletePosition: "rightMidfielder",
      style: {
        position: "absolute",
        top: "4.5rem",
        left: "15rem",
      },
    },
    {
      id: 3,
      image: positionImage,
      athletePosition: "stiker",

      style: {
        position: "absolute",
        top: "18rem",
        left: "15rem",
      },
    },
    {
      id: 4,
      image: positionImage,
      athletePosition: "leftMidfielde",
      style: {
        position: "absolute",
        top: "32rem",
        left: "15rem",
      },
    },
    {
      id: 5,
      image: positionImage,
      athletePosition: "defending",
      style: {
        position: "absolute",
        top: "14rem",
        left: "35rem",
      },
    },
    {
      id: 6,
      image: positionImage,
      athletePosition: "central",
      style: {
        position: "absolute",
        top: "22rem",
        left: "35rem",
      },
    },
    {
      id: 7,
      image: positionImage,
      athletePosition: "rightFullBack",
      style: {
        position: "absolute",
        top: "4rem",
        left: "41rem",
      },
    },
    {
      id: 8,
      image: positionImage,
      athletePosition: "leftFullBack",
      style: {
        position: "absolute",
        top: "32.5rem",
        left: "41rem",
      },
    },
    {
      id: 9,
      image: positionImage,
      athletePosition: "centerBack",
      style: {
        position: "absolute",
        top: "10rem",
        left: "48rem",
      },
    },
    {
      id: 10,
      image: positionImage,
      athletePosition: "centerBackIfUsed",
      style: {
        position: "absolute",
        top: "26rem",
        left: "48rem",
      },
    },
    {
      id: 11,
      image: positionImage,
      athletePosition: "goalKeeper",
      style: {
        position: "absolute",
        top: "18rem",
        left: "53.5rem",
      },
    },
  ]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const positionPicker = (item, index) => {
    setIsModalOpen(true);
    // console.log("index", index);
    setAthleteCoordinate(item.athletePosition);
    setSortOrder(item.id);
  };

  const setPosition = (name, id) => {
    setIsModalOpen(false);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fixtureId: fixtureId,
      position: athleteCoordinate,
      name: name,
      athleteId: id,
      sortOrder: sortOrder,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/fixtures/editTeamOneLineup",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log("edit lineup ==>", result);
        const array = result.teamOneLineup;
        const dummyArray = playerPostion;

        for (var i = 0; i < 11; i++) {
          const data = array.filter(
            (item) => item.sortOrder === dummyArray[i].id
          );
          dummyArray[i]["image"] =
            data.length === 1 ? data[0]?.athleteId.profileImage : positionImage;

          dummyArray[i]["positionId"] = data[0]?._id;
          setPlayerPostion(dummyArray);
          //console.log("dummyarry", dummyArray);
          setPositionUpdate(!positionUpdate);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    console.log("fixture id", fixtureId);
    ShowAthlete();
  }, []);
  const ShowAthlete = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/teams/teamAthletes",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setShowAthlete(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="ace-admin-adminHome-main_container">
      <div style={{ width: "71.5rem" }}>
        <div className="ace-admin-team-line-up-heading_contianer">
          <h1>Team Lineup</h1>
          <div className="ace-admin-team-line-up_title_container">
            <h2>Edit Team Lineup</h2>
          </div>
        </div>
      </div>
      <div className="ace-admin-team-line-up_container">
        {/* <img src={lineUpImage} alt="Line-Up_image" /> */}
        <div
          style={{ position: "relative" }}
          className="ace-admin-team-line-up-background_image"
        >
          {playerPostion.map((item, index) => {
            return (
              <div
                onClick={() => {
                  if (item.image == positionImage) {
                    positionPicker(item, index);
                  } else if (item.image !== positionImage) {
                    //console.log("we will delete", item.positionId);
                    // removePosition(item.positionId);
                    // item.image = positionImage;
                  }
                }}
                style={item.style}
                className="ace-admin-team-line-up-position_image"
              >
                {
                  <img
                    onMouseEnter={() => {
                      if (item.image !== positionImage) {
                        setHover(true);
                      }
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                    }}
                    src={item.image}
                  />
                }
                {hover && item.image !== positionImage ? (
                  // className="ace-admin-team-line-up-position_image-delet-text"
                  <div className="ace-admin-team-line-up-position_image-delet-text">
                    <img src={delet} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="admin-fixture-add-fixture-submit-shedule-main_container">
        <h1></h1>
        <AdminsideBtn text={"Schedule Fixture"} />
      </div>
      <Modal
        // style={{ overflowY: "hidden", position: "relative" }}
        //   title="Basic Modal"
        open={isModalOpen}
        //   onOk={handleOk}
        onCancel={handleCancel}
      >
        {showAthlete.map((item, index) => {
          return (
            <LineUpAdd item={item} index={index} setPosition={setPosition} />
          );
        })}
      </Modal>
    </div>
  );
};

export default LinUpFixture;
