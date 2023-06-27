import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddtNewListing from "../../components/Admin Side/SidebarNavComponents/Listings/AddNewListing/AddNewListings";
import Listings from "../../components/Admin Side/SidebarNavComponents/Listings/Listings";
import UpdatingListing from "../../components/Admin Side/SidebarNavComponents/Listings/updateListing/UpdatingListing";
import UpdatingFixture from "../../components/Admin Side/SidebarNavComponents/Listings/updateListing/UpdatingListing";

const ListingsNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Listings />} />
      <Route path="/addNewListing" element={<AddtNewListing />} />
      <Route path="/updatingListing" element={<UpdatingListing />} />
    </Routes>
  );
};

export default ListingsNavigation;
