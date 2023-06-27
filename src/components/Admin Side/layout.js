import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Redux/ACEDataSlice";
import "./layout.css";
import { Layout } from "antd";
import NotificationBar from "./NotificationBar/NotificationBar";
import SideBar from "./SideBar/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./SidebarNavComponents/Home/AdminHome";
import Team from "./SidebarNavComponents/Team/Team";
import EditProfile from "./SidebarNavComponents/Team/EditProfile/EditProfile";
import TeamNavigation from "../../Navigation/TeamNavigation/TeamNavigation";
import FixtureNavigation from "../../Navigation/FixtureNavigation/FixtureNavigation";
import ObjectivesNavigation from "../../Navigation/ObjectivesNavigation.js/ObjectivesNavigation";
import ListingsNavigation from "../../Navigation/ListingsNavigation/ListingsNavigation";
import EventNavigation from "../../Navigation/EventNavigation/EventNavigation";
import AthleteChat from "./SidebarNavComponents/Chat/AthleteChat";
const { Sider, Content } = Layout;

function LayoutACE() {
  let disPatch = useDispatch();
  const logOutWeb = () => {
    disPatch(logOut());
    console.log("click here");
  };

  return (
    <div className="ace-admin-layout">
      <Layout>
        <Sider className="ace-admin-layout-sider">
          <SideBar />
        </Sider>
        <Layout>
          <Content>
            <div className="ace-admin-overflow">
              <Routes>
                <Route path="AdminHome" element={<AdminHome />} />
                <Route exact path="team/*" element={<TeamNavigation />} />
                <Route
                  exact
                  path="fixtures/*"
                  element={<FixtureNavigation />}
                />
                <Route
                  exact
                  path="objectives/*"
                  element={<ObjectivesNavigation />}
                />
                <Route
                  exact
                  path="listings/*"
                  element={<ListingsNavigation />}
                />
                <Route exact path="events/*" element={<EventNavigation />} />
                <Route exact path="chat/*" element={<AthleteChat />} />
              </Routes>
            </div>
          </Content>
        </Layout>
        <Sider className="ace-admin-layout-sider">
          <NotificationBar />
        </Sider>
      </Layout>
    </div>
  );
}

export default LayoutACE;
