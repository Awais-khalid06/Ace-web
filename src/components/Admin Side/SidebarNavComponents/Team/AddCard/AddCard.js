import React, { useState } from "react";
import SubmitButton from "../../../../../smallComponets/Input/button/SubmitButton";
import DropDown from "../../../../../smallComponets/Input/DropDown/DropDown";
import AthleteProfileCard from "../../../smallComponents/AthleteProfileCard/AthleteProfileCard";
import { Navigate, useLocation } from "react-router-dom";
import { GeneralFetch } from "../../../../../Api/ApiCaller";
import Route from "../../../../../Api/Route";
import { useSelector } from "react-redux";
import { GreenNotification } from "../../../smallComponents/Notification/Notification";
import { useNavigate } from "react-router-dom";

const AddCard = () => {
  const token = useSelector((data) => data.Data.userData.token);
  const [isloading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState({
    label: "Yellow",
    value: "yellowCard",
  });
  const { state } = useLocation();
  const options = [
    { label: "Yellow", value: true },
    { label: "Red", value: true },
  ];
  const Navigate = useNavigate();

  const addCard = () => {
    let body = {
      id: state?.item?._id,
      yellowCard: selected.label === "Yellow" ? true : false,
      redCard: selected.label === "Red" ? true : false,
    };
    const getRes = (res) => {
      GreenNotification("Add Card", "Card is Successfully Added.");
      //   console.log("add card", res);
      Navigate("/dashboard/team/AthleteProfile", {
        state: {
          athleteId: state?.item?._id,
        },
      });
    };

    GeneralFetch(
      token,
      "POST",
      Route.addCard,
      body,
      setIsLoading,
      getRes,
      (error) => {}
    );
  };
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Add Card</h2>
        </div>
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <div className="ace-admin-athlete_view_profile-add-card-text">
            <h3>Add Card to {state?.item?.name}</h3>
          </div>
          <AthleteProfileCard item={state?.item} />
          <div style={{ padding: "0 0 15.4rem 0" }}>
            <DropDown
              bg={{ background: "#2B2D30" }}
              text={"Card Type"}
              options={options}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <SubmitButton
            isloading={isloading}
            text={"Add card"}
            onClick={addCard}
          />
          <div style={{ paddingBottom: "8.2rem" }}></div>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
