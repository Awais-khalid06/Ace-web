import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AthleteProfileCard from "../../../smallComponents/AthleteProfileCard/AthleteProfileCard";
import "./AthleteProfile.css";
import skillVideo from "./skill-pic.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { GeneralFetch } from "../../../../../Api/ApiCaller";
import Route from "../../../../../Api/Route";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { GreenNotification } from "../../../smallComponents/Notification/Notification";

const AthleteProfile = () => {
  const [isloading, setIsLoading] = useState(false);
  const [athleteProfile, setAthleteProfile] = useState({});
  const token = useSelector((data) => data.Data.userData.token);
  const { state } = useLocation();
  const Navigate = useNavigate();

  const gettingAthleteProfile = () => {
    let body = {
      id: state.athleteId,
    };

    const getRes = (res) => {
      // console.log("athlete Profile", res);
      setAthleteProfile(res);
    };

    GeneralFetch(
      token,
      "POST",
      Route.gettingAthleteProfile,
      body,
      setIsLoading,
      getRes,
      (error) => {}
    );
  };

  const moveAddCard = () => {
    Navigate("/dashboard/team/addCard", {
      state: {
        item: athleteProfile,
      },
    });
  };
  useEffect(() => {
    gettingAthleteProfile();
  }, []);

  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Athlete Profile</h2>
        </div>
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <div style={{ marginTop: "6.5rem" }}>
            <AthleteProfileCard item={athleteProfile} />
          </div>

          <div className="ace-admin-team-athlete_profile-video_container">
            <div className="ace-admin-team-athlete_profile-video-highlight_skills">
              <h2>Highlighted Skills</h2>
            </div>
            <div className="ace-admin-team-athlete_profile-video-skills-videos">
              <img src={skillVideo} />
              <img src={skillVideo} />
              <img src={skillVideo} />
            </div>
          </div>
          <div style={{ margin: "2rem" }}></div>
          <div className="ace-admin-team-athlete_profile-bio-main_container">
            <div className="ace-admin-team-athlete_profile-about_bio-main_container">
              <p>Biography</p>
              <div style={{ paddingBottom: "2.1rem" }}></div>
              <div>
                <ProfileBio title={"Country"} value={athleteProfile?.country} />
                <ProfileBio
                  title={"Birthday"}
                  value={
                    athleteProfile?.birthday
                      ? moment(athleteProfile?.birthday).format("ll")
                      : null
                  }
                />
                <ProfileBio
                  title={"Positions"}
                  value={athleteProfile?.position}
                />
                <ProfileBio
                  title={"Shirt Number"}
                  value={athleteProfile?.shirtNo}
                />
                <ProfileBio title={"Weight"} value={athleteProfile?.weight} />
              </div>
            </div>
            <div className="ace-admin-athlete_profile-about-macth-main_container">
              <div className="ace-admin-athlete_profile-about-macth-heading-container">
                <h2>About Matches</h2>
                <div></div>
              </div>
              <div style={{ paddingBottom: "1.7rem" }}></div>
              <div className="ace-admin-athlete_profile-about-macth-info-main_container">
                <div style={{ marginTop: "1rem" }}>
                  <EllipseInfo title={"Matches"} value={"0"} />
                </div>
                <div className="ace-admin-athlete_profile-about-macth-goal_assist-container">
                  <EllipseInfo title={"Goals"} value={"0"} />
                  <EllipseInfo title={"Assists"} value={"0"} />
                </div>
                <div
                  style={{ paddingTop: "0.7rem" }}
                  className="ace-admin-athlete_profile-about-macth-goal_assist-container"
                >
                  <EllipseInfo
                    title={"Yellow Card"}
                    value={
                      athleteProfile?.yellowCard
                        ? athleteProfile?.yellowCard
                        : "0"
                    }
                  />
                  <EllipseInfo
                    title={"Red Card"}
                    value={
                      athleteProfile?.redCard ? athleteProfile?.redCard : "0"
                    }
                  />
                </div>
              </div>
              <div
                style={{ paddingTop: "1rem" }}
                className="ace-admin-athlete_profile-add_card-link"
              >
                <p onClick={moveAddCard}>Add Card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileBio = ({ title, value }) => {
  return (
    <div className="ace-admin-athlete-profile-info-main_container">
      <div className="ace-admin-athlete-profile-info-container">
        <h2>{title}</h2>
        <p>{value}</p>
      </div>
      <hr className="ace-admin-athlete-profile-line" />
    </div>
  );
};

const EllipseInfo = ({ title, value }) => {
  return (
    <div className="ace-admin-home-profile_info-ellipse_card-container">
      <div className="ace-admin-home-profile_info-ellipse_card">
        <p>{value}</p>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default AthleteProfile;
