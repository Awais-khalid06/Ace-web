import React, { useEffect, useState } from "react";
import TopMainHeading from "../../smallComponents/TopMainHeading/TopMainHeading";

import ListingDetails from "../Home/components/listingDetails";
import "./Listings.css";
import { useSelector } from "react-redux";
import CrudListingCard from "./CrudListingCard/CrudListingCard";
import { GeneralFetch } from "../../../../Api/ApiCaller";
import Route from "../../../../Api/Route";
import { useNavigate } from "react-router-dom";
import {
  GreenNotification,
  RedNotification,
} from "../../smallComponents/Notification/Notification";
import { message } from "antd";
import Loader from "../../smallComponents/Loader/Loader";

const Listings = () => {
  const [mylisting, setMyListing] = useState([]);
  const [newListing, setNewListing] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [stateUpdate, setStateUpdate] = useState(true);
  const data = useSelector((data) => data.Data.userData);
  const Navigate = useNavigate();

  const updatListing = (id, listingItem) => {
    Navigate("/dashboard/listings/updatingListing", {
      state: {
        id: id,
        listingItem: listingItem,
      },
    });
  };

  const statusChange = (id, checked) => {
    let body = {
      id: id,
      isActive: checked,
    };

    const getRes = (res) => {
      if (res.isActive == true) {
        setStateUpdate(!stateUpdate);
        GreenNotification(
          "My Listing",
          `${res.name} is Activated`
          // (descri = `${res.name} is Activated`)
        );
      } else if (res.isActive == false) {
        setStateUpdate(!stateUpdate);
        RedNotification("My Listing", `${res.name} is Deactivated`);
      }
    };

    GeneralFetch(
      data.token,
      "POST",
      Route.updateListing,
      body,
      setIsloading,
      getRes,
      (error) => {}
    );
  };

  const deletListing = (id) => {
    const body = {
      id: id,
    };
    const getDeletRes = (res) => {
      RedNotification("My Listing", `${res.name} is Deleted.`);
      setStateUpdate(!stateUpdate);
      console.log(res);
    };
    GeneralFetch(
      data.token,
      "POST",
      Route.deletListing,
      body,
      setIsloading,
      getDeletRes,
      (error) => {}
    );
  };

  const gettingNewListing = () => {
    setIsloading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      currentPage: "1",
      pageSize: "12",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/listings/newRecords",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setIsloading(false);

        setNewListing(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const gettingMyListing = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/listings/all",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setMyListing(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    gettingMyListing();
    gettingNewListing();
  }, [stateUpdate]);
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <TopMainHeading
          text1="Listings"
          text2="Add New"
          link="/dashboard/listings/addNewListing"
        />
      </div>

      <div className="ace-admin-objectives-training-premium-main_container">
        <div className="ace-admin-objectives-my-training-mainContainer">
          <div className="ace-admin-objectives-my-training-text-container">
            <div className="ace-admin-objectives-my-trainig-heading-text">
              <h2>New Listings</h2>
            </div>
            <div className=""></div>
          </div>
          <div className="ace-admin-objectives-my-training-contianer">
            <div style={{ marginTop: "2.2rem" }}></div>
            {newListing.map((item) => {
              return <ListingDetails item={item} />;
            })}
          </div>
        </div>
        <div className="ace-admin-objectives-premium-mainContainer">
          <div className="ace-admin-objectives-my-training-text-container">
            <div className="ace-admin-objectives-my-trainig-heading-text">
              <h2>My Listings</h2>
            </div>
            <div className=""></div>
          </div>
          <div className="ace-admin-objectives-my-training-contianer">
            <div style={{ marginTop: "1.6rem" }}>
              {mylisting.map((item) => {
                return (
                  <CrudListingCard
                    statusChange={statusChange}
                    item={item}
                    deletListing={deletListing}
                    updatListing={updatListing}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
