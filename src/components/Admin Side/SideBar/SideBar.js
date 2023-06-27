import React from "react";
import acelogo from "./static/ace-logo2.png";
import "./SideBar.css";
import SidebarMenu from "../smallComponents/sidebarMenu/sidebarMenu";
import home from "./static/home-ace-icon.png";
import homeGreen from "./static/home-green-icon.png";
import fixture from "./static/fixture-ace-icon.png";
import fixtureGreen from "./static/fixture-green-icon.png";
import listing from "./static/listings-ace-icon.png";
import listingGreen from "./static/listing-green-icon.png";
import objectives from "./static/objectives-ace-icon.png";
import objectivesGreen from "./static/objectives-green-icon.png";
import team from "./static/team-ace-icon.png";
import teamGreen from "./static/team-green-icon.png";
import events from "./static/events-ace-icon.png";
import eventGreen from "./static/Event-green-icon.png";
import Message from "./static/message-circle.png";
import MessageGreen from "./static/message-green-icon.png";
import messageGreen from "./static/message-green-icon.png";
import signout from "./static/sign-out-al.png";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../Redux/ACEDataSlice";

const SideBar = () => {
  let disPatch = useDispatch();
  const logOutWeb = () => {
    disPatch(logOut());
    console.log("click here");
  };
  return (
    <div>
      <div className="ace-dashboard-layout-sidebar-logo-container">
        <img src={acelogo} alt="ace-logo" />
        <div className="ace-dashboard-layout-sidebar-name-container">
          <p className="ace-dashboard-layout-sidebar-name">Ace</p>
          <p className="ace-dashboard-layout-sidebar-name-slogan">
            The Future of Sports
          </p>
        </div>
      </div>
      <SidebarMenu
        icon={
          window.location.href.includes("/dashboard/AdminHome")
            ? homeGreen
            : home
        }
        color={
          window.location.href.includes("/dashboard/AdminHome")
            ? "#82EF00"
            : "#ffffff"
        }
        text="Home"
        navLink="/dashboard/AdminHome"
      />
      <SidebarMenu
        icon={
          window.location.href.includes("/dashboard/team") ? teamGreen : team
        }
        color={
          window.location.href.includes("/dashboard/team")
            ? "#82EF00"
            : "#ffffff"
        }
        text="Team"
        navLink="/dashboard/team"
      />
      <SidebarMenu
        icon={
          window.location.href.includes("/dashboard/fixtures")
            ? fixtureGreen
            : fixture
        }
        color={
          window.location.href.includes("/dashboard/fixtures")
            ? "#82EF00"
            : "#ffffff"
        }
        text="Fixtures"
        navLink="/dashboard/fixtures"
      />
      <SidebarMenu
        icon={
          window.location.href.includes("/dashboard/objectives")
            ? objectivesGreen
            : objectives
        }
        color={
          window.location.href.includes("/dashboard/objectives")
            ? "#82EF00"
            : "#ffffff"
        }
        text="Objectives"
        navLink="/dashboard/objectives"
      />
      <SidebarMenu
        icon={
          window.location.href.includes("/dashboard/listings")
            ? listingGreen
            : listing
        }
        color={
          window.location.href.includes("/dashboard/listings")
            ? "#82EF00"
            : "#ffffff"
        }
        text="Listing"
        navLink="/dashboard/listings"
      />
      <SidebarMenu
        icon={
          window.location.href.includes("/dashboard/events")
            ? eventGreen
            : events
        }
        color={
          window.location.href.includes("/dashboard/events")
            ? "#82EF00"
            : "#ffffff"
        }
        text="Events"
        navLink="/dashboard/events"
      />
      <div style={{ margin: "6.3rem  0 0 0" }}>
        <SidebarMenu
          icon={
            window.location.href.includes("/dashboard/chat")
              ? messageGreen
              : Message
          }
          text="Messages"
          color={
            window.location.href.includes("/dashboard/chat")
              ? "#82EF00"
              : "#ffffff"
          }
          style={{
            width: "15px",
            height: "15px",
            background: "#82EF00",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            margin: "0 0 0 11rem",
          }}
          number="1"
          navLink="/dashboard/chat"
        />
      </div>
      <hr className="ace-dashboard-layout-sidebar-line" />
      <div style={{ padding: "16.3rem 0 17.2rem 0" }}></div>
      <SidebarMenu
        imageStyle={{ width: "2.5rem", height: "2.5rem" }}
        fontSize={"2rem"}
        icon={signout}
        text="Logout"
        navLink=""
        onClick={logOutWeb}
      />
    </div>
  );
};

export default SideBar;
