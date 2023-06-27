import React from "react";
import "./quotes.css";
import quotes from "../Static/quotes.png";

const Quotes = () => {
  return (
    <div className="ac__home__quotes__container">
      <div className="ac__home__quotes__img-container">
        <img src={quotes} />
      </div>
      <p>
        vestibulum dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        A hac arcu porttitor felis ut vestibulum dui. Lorem ipsum dolor sit
        amet, consectetur adipiscin
      </p>
      <h1>James Kovera</h1>
      <h3>Athlete</h3>
    </div>
  );
};

export default Quotes;
