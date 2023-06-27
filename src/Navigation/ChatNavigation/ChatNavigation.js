import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AthleteChat from "../../components/Admin Side/SidebarNavComponents/Chat/AthleteChat";

const ChatNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<AthleteChat />} />
    </Routes>
  );
};

export default ChatNavigation;
