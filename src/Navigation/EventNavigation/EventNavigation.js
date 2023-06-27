import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AttendEvents from "../../components/Admin Side/SidebarNavComponents/Events/AttendEvent/AttendEvents";
import Event from "../../components/Admin Side/SidebarNavComponents/Events/Event";

const EventNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Event />} />
      <Route path="/attendEvent" element={<AttendEvents />} />
    </Routes>
  );
};

export default EventNavigation;
