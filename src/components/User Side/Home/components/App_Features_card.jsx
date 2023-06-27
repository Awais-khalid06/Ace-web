import React from "react";
import App_Feature_card from "./App_Feature_card.css";

const App_Features_card = ({ title, description }) => {
  return (
    <div className="app__features__card-Container">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default App_Features_card;
