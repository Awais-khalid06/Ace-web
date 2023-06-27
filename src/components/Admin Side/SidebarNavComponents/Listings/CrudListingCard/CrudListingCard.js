import React, { useState } from "react";
import "./CrudListingCard.css";
import { Switch } from "antd";
import deletIcon from "../static/delet-icon.png";
import editIcon from "../static/edit.png";
import moment from "moment";

const CrudListingCard = ({
  onChange,
  statusChange,
  item,
  deletListing,
  updatListing,
}) => {
  const [checked, setChecked] = useState(item?.isActive);
  //   setChecked(item?.isActive);
  const stateChange = () => {
    setChecked(!checked);
  };
  return (
    <div className="ace-listing-crud_listing-details-main_container">
      <div className="ace-listing-crud_listing-details-icon-main_container">
        <div className="ace-listing-crud_listing-details-icon-heading_container">
          <h2>{item?.name}</h2>
        </div>
        <div className="ace-listing-crud_listing-details-icon-container">
          <div style={{ paddingTop: "1px" }}>
            <Switch
              onClick={() => statusChange(item?._id, !item?.isActive)}
              defaultChecked={item?.isActive}
              //   onChange={() => setChecked(!item?.isActive)}
            />
          </div>
          <div
            className="ace-listing-crud-listing-detail-deletIcon"
            onClick={() => updatListing(item?._id, item)}
          >
            <img src={editIcon} />
          </div>
          <div
            className="ace-listing-crud-listing-detail-editIcon"
            onClick={() => deletListing(item?._id)}
          >
            <img src={deletIcon} />
          </div>
        </div>
      </div>
      <div className="ace-listing-crud-listing-detail-des">
        <p>{item?.details}</p>
      </div>
      <div className="ace-listing-crud-listing-detail-looking_for-container">
        <h2>{item?.lookingFor}</h2>
        <p>
          Date :{item?.updatedAt ? moment(item?.updatedAt).format("LLL") : null}
        </p>
      </div>
    </div>
  );
};

export default CrudListingCard;
