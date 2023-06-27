import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFixture from "../../components/Admin Side/SidebarNavComponents/Fixtures/Addfixture/AddFixture";
import GoalOfPlayerAdd from "../../components/Admin Side/SidebarNavComponents/Fixtures/AddPlayerName/AddPlayerName";
import Fixtures from "../../components/Admin Side/SidebarNavComponents/Fixtures/Fixtures";
import LinUpFixture from "../../components/Admin Side/SidebarNavComponents/Fixtures/LineUpFixture/LinUpFixture";
import UpDateResult from "../../components/Admin Side/SidebarNavComponents/Fixtures/upDAteResult/UpDateResult";

const FixtureNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Fixtures />} />
      <Route path="/addFixture" element={<AddFixture />} />
      <Route path="/lineUpFixture" element={<LinUpFixture />} />
      <Route path="/upDateResult" element={<UpDateResult />} />
      <Route path="/goalOfPlayerAdd" element={<GoalOfPlayerAdd />} />
    </Routes>
  );
};

export default FixtureNavigation;
