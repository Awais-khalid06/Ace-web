import React, { useEffect, useState } from "react";
import bell from "./static/bell-notification.png";
import "./Notificationbar.css";
import profile from "./static/profile-image.jpg";
import { Col, Row } from "antd";
import imag1 from "./static/p-image1.jpg";
import img2 from "./static/p-image2.png";
import profile2 from "./static/profile-image2.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Route from "../../../Api/Route";
import { GeneralFetch } from "../../../Api/ApiCaller";
import { useNavigate } from "react-router-dom";

const teamMember = [
  {
    id: 1,
    image: img2,
  },
  {
    id: 2,
    image: img2,
  },
  {
    id: 3,
    image: img2,
  },
  {
    id: 4,
    image: img2,
  },
  {
    id: 5,
    image: img2,
  },
  {
    id: 6,
    image: img2,
  },
  {
    id: 7,
    image: img2,
  },
  {
    id: 8,
    image: img2,
  },
  {
    id: 9,
    image: img2,
  },
  {
    id: 10,
    image: img2,
  },
  {
    id: 11,
    image: img2,
  },
  {
    id: 12,
    image: img2,
  },
  {
    id: 13,
    image: img2,
  },
  {
    id: 14,
    image: img2,
  },
  {
    id: 15,
    image: img2,
  },
];

const NotificationBar = () => {
  const data = useSelector((data) => data.Data.userData);
  const [teamAthlete, setTeamAthlete] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [profile, setprofile] = useState();
  const Navigate = useNavigate();
  console.log("data from redux", data);

  const setProf = (img) => setprofile(img);
  const movetoEditScreen = () => {
    Navigate("/dashboard/team/editCoachProfile", {
      state: {
        // setProf: setProf,
        // param: "SAMAMA",
      },
    });
  };
  const getCoachProfile = () => {
    const getDeletRes = (res) => {
      setProfileData(res);
      setprofile(res?.profileImage);
      //   Navigate("/dashboard/listings");
    };
    GeneralFetch(
      data.token,
      "GET",
      Route.getCoachProfile,
      null,
      setIsloading,
      getDeletRes,
      (error) => {}
    );
  };

  const getTeamAthlete = () => {
    const getDeletRes = (res) => {
      setTeamAthlete(res);
      console.log("team Athlete", res);
    };
    GeneralFetch(
      data.token,
      "POST",
      Route.teamAthlete,
      null,
      setIsloading,
      getDeletRes,
      (error) => {}
    );
  };

  useEffect(() => {
    getTeamAthlete();
    getCoachProfile();
  }, []);
  return (
    <div>
      <div className="ace-notification-bar-notification-container">
        <div className="ace-notification-bar-bell_container">
          <img src={bell} alt="bell-icon" />
          <h1>Notifications</h1>
        </div>
        <p>You got new team join request</p>
        <p>William join your fitness course</p>
        <p>You got new message request</p>
      </div>
      <div style={{ margin: "1.2rem 0 0 0" }}></div>
      <hr className="ace-dashboard-layout-sidebar-line" />
      <div className="ace-notification_bar-coach-profile_container">
        <img src={data?.profileImage} alt="profile-image" />
        <h1>{data.name}</h1>

        <Link to={"/dashboard/team/editCoachProfile"}>
          <p> Edit Coach Profile</p>
        </Link>
      </div>
      <hr className="ace-dashboard-layout-sidebar-line" />
      <div className="ace-notification-layout-sidebar-athleteTeam">
        <h1>Athletes in Team</h1>
        <Link to="/dashboard/team/SeeAthlete">See All</Link>
      </div>
      <Row className="ace-notification_bar-coach-profile_team">
        {teamAthlete.map((item) => {
          return (
            <Col span={8}>
              <img src={item?.athleteId?.profileImage} alt="team-profile" />
            </Col>
          );
        })}
      </Row>
      <div style={{ padding: "0 0 5.9rem 0" }}></div>
    </div>
  );
};

export default NotificationBar;
