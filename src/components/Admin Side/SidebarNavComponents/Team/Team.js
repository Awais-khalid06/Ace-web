import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TeamProfile from "./myTeamComponents/teamProfile";
import "./Team.css";
import lineUp_image from "./static/line-up-image.png";
import thum1 from "./static/videoThum1.png";
import thum2 from "./static/videoThum2.png";
import thum3 from "./static/videoThum3.png";
import thum4 from "./static/videoThum4.png";
import playicon from "./static/play-icon.png";
import AthleteRequest from "../../smallComponents/athleteRequest/AthleteRequest";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { GeneralFetch } from "../../../../Api/ApiCaller";
import Route from "../../../../Api/Route";

const videoThumbnail = [
  {
    id: 1,
    img: thum1,
  },
  {
    id: 2,
    img: thum2,
  },
  {
    id: 3,
    img: thum4,
  },
  {
    id: 4,
    img: thum3,
  },
  {
    id: 5,
    img: thum1,
  },
  {
    id: 6,
    img: thum2,
  },
  {
    id: 7,
    img: thum3,
  },
  {
    id: 8,
    img: thum4,
  },
];

const Team = () => {
  const [selsected, setSelected] = useState({
    id: 1,
    name: "Team",
  });
  const [myteam, setMyTeam] = useState({});
  const [viewTeamRequest, setViewTeamRequest] = useState([]);
  const [requestAthlete, setRequestAthlete] = useState({});
  const [requestAthleteRemove, setRequestAthleteRemove] = useState({});
  const [videos, setVideos] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const Navigate = useNavigate();
  const token = useSelector((data) => data.Data.userData.token);

  const getMyteam = () => {
    const getRes = (res) => {
      //console.log("athlete Profile", res);
      setMyTeam(res);
    };

    GeneralFetch(
      token,
      "GET",
      Route.getCoachTeam,
      null,
      setIsLoading,
      getRes,
      (error) => {}
    );
  };

  const openNotification = (name) => {
    notification.open({
      message: "Request Accept",
      description: `Request of ${name} is successfully accepted.`,
      // className: "notificationDesign",
      style: { color: "#fff", background: "green" },
    });
  };

  const openNotification2 = (name) => {
    notification.open({
      message: "Remove Request",
      description: `Request of ${name} is Removed.`,
      // className: "notificationDesign",
      style: { color: "#fff", background: "red" },
    });
  };

  const ViewTeamRequest = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      //body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/atheteRequests/teamRequests",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setViewTeamRequest(result);
      })
      .catch((error) => console.log("error", error));
  };

  const acceptRequest = (id, name) => {
    console.log("id of athlete", id);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      athlete: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/atheteRequests/acceptRequest",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRequestAthlete(result);
        openNotification(name);
      })
      .catch((error) => console.log("error", error));
  };

  const removeRequest = (id, name) => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      athlete: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/atheteRequests/removeRequest",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRequestAthleteRemove(result);
        openNotification2(name);
      })
      .catch((error) => console.log("error", error));
  };

  const teamArray = [
    {
      id: 1,
      name: "Team",
    },

    {
      id: 2,
      name: "Club",
    },
    {
      id: 3,
      name: "League",
    },
    {
      id: 4,
      name: "Region",
    },
  ];

  const getVideos = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      shortType: selsected.name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/shorts/coachCatShorts",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("gettingVideos", result);
        setVideos(result);
      })
      .catch((error) => console.log("error", error));
  };
  const selectApi = (item) => {
    setSelected(item);
  };
  const moveToaddShort = () => {
    Navigate("/dashboard/team/addShort", {
      state: {
        shortType: selsected.name,
      },
    });
  };

  const moveToVideoPlay = (item) => {
    Navigate("/dashboard/team/videoPlayer", {
      state: {
        videoPlay: item,
      },
    });
  };

  useEffect(() => {
    ViewTeamRequest();
  }, [requestAthlete, requestAthleteRemove]);

  useEffect(() => {
    getVideos();
    getMyteam();
  }, [selsected]);
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-team_my-team">
        <h1>My Team</h1>
      </div>
      <div className="ace-admin-team-my_team-main_container">
        <div className="ace-admin-team-my_team-container">
          <div className="ace-admin-team-my_team-container-main_heading">
            <h1>Team Profile</h1>
          </div>
          <TeamProfile item={myteam} />
        </div>
        <div className="ace-admin-team-line-up-container">
          <div className="ace-admin-team-my_team-container-main_heading">
            <h1>Team Lineup</h1>
          </div>
          <Link to={"/dashboard/team/line-up"}>
            <img src={lineUp_image} alt="line-upImage" />
          </Link>
        </div>
      </div>
      <div className="ace-admin-team_my-team">
        <h2>Highlights/Shorts</h2>
      </div>
      <div className="ace-admin-team_videos-main_container">
        <div className="ace-admin-team_videos-categroy_container">
          <div className="ace-admin-team_videos-categroy_title">
            {teamArray.map((item) => {
              return (
                <h2
                  onClick={() => selectApi(item)}
                  style={{
                    color: item.id === selsected.id ? "white" : "#727272",
                  }}
                >
                  {item.name}
                </h2>
              );
            })}
          </div>
          <div
            className="ace-admin-team_videos-categroy_title-add_short"
            onClick={moveToaddShort}
          >
            <p>Add Short</p>
          </div>
        </div>
        <div className="ace-admin-team_videos-main_container-over-flow">
          <div className="ace-admin-team_videos_container">
            {/* {videoThumbnail.map((item) => {
              return <img src={item.img} alt="thumbnail" />;
            })} */}
            {videos.map((item) => {
              return (
                <div
                  className="ace-admin-video_player-container"
                  onClick={() => moveToVideoPlay(item)}
                >
                  <video>
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <img src={playicon} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="ace-admin-team_my-team">
        <h3>Athlete Requests</h3>
      </div>
      <div style={{ height: "5rem" }}>
        {viewTeamRequest.map((item) => {
          return (
            <AthleteRequest
              item={item}
              acceptRequest={acceptRequest}
              removeRequest={removeRequest}
            />
          );
        })}
      </div>
      {/* <Modal open={isModalOpen} onCancel={handleCancel}>
        <video controls preload="auto" width="640" height="264">
          <source src={item.video} type="video/mp4" />
        </video>
      </Modal> */}
    </div>
  );
};

export default Team;
