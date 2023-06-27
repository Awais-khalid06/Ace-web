import moment from "moment";
import React from "react";
import "./Listingdetails.css";

const ListingDetails = ({ item }) => {
  console.log("item", item);
  return (
    <div className="ace-adminHome-listingDetail-main_container">
      <div className="ace-adminHome-listingDetail-main_container-title">
        <h2>{item?.name}</h2>
        <h3>{item?.details}</h3>
      </div>
      <div className="ace-adminHome-listingDetail-main_container-athlete">
        <h2>{item?.lookingFor}</h2>
        <h2>
          {item?.updatedAt ? moment(item?.updatedAt).format("LLL") : null}
        </h2>
      </div>
    </div>
  );
};

export default ListingDetails;
