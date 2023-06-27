import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPremium from "../../components/Admin Side/SidebarNavComponents/Objectives/AboutPremium/AboutPremium";
import AddClassInPremium from "../../components/Admin Side/SidebarNavComponents/Objectives/AddClassInPremium/AddClassInPremium";
import AddClassTraining from "../../components/Admin Side/SidebarNavComponents/Objectives/AddClassInTraining/AddClassTraining";
import AddNewPremium from "../../components/Admin Side/SidebarNavComponents/Objectives/AddNewPremium/AddNewPremium";
import AddNewTraining from "../../components/Admin Side/SidebarNavComponents/Objectives/AddNewTraining/AddNewTraining";
import AddPhotoInTraing from "../../components/Admin Side/SidebarNavComponents/Objectives/AddPhotoInTrainig/AddPhotoInTraing";
import EditTraingClass from "../../components/Admin Side/SidebarNavComponents/Objectives/EditTrainingClss/EditTraingClass";
import Objectives from "../../components/Admin Side/SidebarNavComponents/Objectives/Objectives";
import TestingUpload from "../../components/Admin Side/SidebarNavComponents/Objectives/testingUpload";
import UpdateNewTraining from "../../components/Admin Side/SidebarNavComponents/Objectives/updateNewTraining/UpdateNewTraining";
import UpdatePhotoTraining from "../../components/Admin Side/SidebarNavComponents/Objectives/updatePhotoTraining/UpdatePhotoTraining";

const ObjectivesNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Objectives />} />
      <Route path="/addNewTraining" element={<AddNewTraining />} />
      <Route path="/addPhotoInTraining" element={<AddPhotoInTraing />} />
      <Route path="/addClassTraining" element={<AddClassTraining />} />
      <Route path="/addNewPremium" element={<AddNewPremium />} />
      <Route path="/aboutPremium" element={<AboutPremium />} />
      <Route path="/aboutClassInPremium" element={<AddClassInPremium />} />
      <Route path="/testingUpload" element={<TestingUpload />} />
      <Route path="/updateNewTraining" element={<UpdateNewTraining />} />
      <Route path="/updatePhotoTraining" element={<UpdatePhotoTraining />} />
      <Route path="/editTrainingClass" element={<EditTraingClass />} />
    </Routes>
  );
};

export default ObjectivesNavigation;
