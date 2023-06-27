import React from "react";
import "./PremiumPlanCard.css";
import premium_img from "../../static/premium-card-pic.png";

const PremiumPlanCard = ({ item }) => {
  return (
    <div className="ace-admin-objectives-comp-premium-main_conatainer">
      <img src={item?.featuredImage} />
      <div className="ace-admin-objectives-comp-info-container">
        <h1>
          {item?.title.length > 10
            ? item?.title.substring(0, 15) + "..."
            : item?.title}
        </h1>
        <h2>
          {item?.description.length > 10
            ? item?.description.substring(0, 30) + "..."
            : item?.description}
        </h2>
        <h3>Coach Name</h3>
        <p>Time : 45 min</p>
      </div>
      <div className="ace-admin-ojectives-comp-emtp"></div>
    </div>
  );
};

export default PremiumPlanCard;
