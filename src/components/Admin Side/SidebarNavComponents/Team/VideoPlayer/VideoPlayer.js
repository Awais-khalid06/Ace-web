import React from "react";
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  const { state } = useLocation();
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Video Play</h2>
        </div>
        <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <video
              controls
              preload="auto"
              width="720"
              height="540"
              //poster="https://cdn.pixabay.com/photo/2016/11/29/03/53/camera-1867184_960_720.jpg"
              poster="https://cdn.pixabay.com/photo/2017/06/30/03/34/gui-2457115_960_720.png"
            >
              <source src={state?.videoPlay?.video} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
