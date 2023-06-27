import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditCoachProfile from "../../components/Admin Side/SidebarNavComponents/Home/EditCoachProfile/EditCoachProfile";
import AddCard from "../../components/Admin Side/SidebarNavComponents/Team/AddCard/AddCard";
import AddShort from "../../components/Admin Side/SidebarNavComponents/Team/AddShort/AddShort";
import AthleteProfile from "../../components/Admin Side/SidebarNavComponents/Team/AthleteProfile/AthleteProfile";
import EditProfile from "../../components/Admin Side/SidebarNavComponents/Team/EditProfile/EditProfile";
import LIneUpTeam from "../../components/Admin Side/SidebarNavComponents/Team/LineUp/LIneUpTeam";
import SeeAthlete from "../../components/Admin Side/SidebarNavComponents/Team/SeeAllAthlete/SeeAthlete";
import Team from "../../components/Admin Side/SidebarNavComponents/Team/Team";
import VideoPlayer from "../../components/Admin Side/SidebarNavComponents/Team/VideoPlayer/VideoPlayer";

const TeamNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Team />} />
      <Route path="editProfile" element={<EditProfile />} />
      <Route path="line-up" element={<LIneUpTeam />} />
      <Route path="addShort" element={<AddShort />} />
      <Route path="videoPlayer" element={<VideoPlayer />} />
      <Route path="SeeAthlete" element={<SeeAthlete />} />
      <Route path="AthleteProfile" element={<AthleteProfile />} />
      <Route path="editCoachProfile" element={<EditCoachProfile />} />
      <Route path="addCard" element={<AddCard />} />
    </Routes>
  );
};

export default TeamNavigation;
