import React from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import App_Features_card from "./components/App_Features_card";
import "./Home.css";
import display from "./Static/ace-display.png";
import pic1 from "./Static/pic-1.png";
import pic2 from "./Static/pic-2.png";
import pic3 from "./Static/pic-3.png";
import iphone from "./Static/iphone-pro.png";
import Quotes from "./components/Quotes";
import mobileView from "./Static/mobile_view.png";
import Footer from "../../../HOC/User Side/footer/Footer";

const Home = () => {
  return (
    <div className="ace__container">
      <NavBar />
      {/* Download App */}
      <div className="ace__application-download__section">
        <div className="application-download__section__download_app">
          <h1>Sports Application for the Future</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A hac arcu
            porttitor felis ut vestibulum dui.
          </p>
          <div className="application-download__section__download_app__btn-container">
            <div className="application-download__section__download_app__btn-container-blue">
              <p>Download App</p>
            </div>
            <div className="application-download__section__download_app__btn-container-white">
              <p>About App</p>
            </div>
          </div>
        </div>
        <div className="application-download__section__display_web">
          <img src={display} alt="image of display website" />
        </div>
      </div>

      {/* About Us */}
      <div className="ace__about-us__section">
        <div className="ace__about-us__gallery">
          <div className="ace__about-us__gallery__pic1">
            <img src={pic1} />
          </div>
          <div className="ace__about-us__gallery__pic2">
            <img src={pic2} />
          </div>
          <div className="ace__about-us__gallery__pic3">
            <img src={pic3} />
          </div>
        </div>
        <div className="ace__about-us__description">
          <h1>About Ace</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A hac arcu
            porttitor felis ut vestibulum dui. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. A hac arcu porttitor felis ut
            vestibulum dui. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. A hac arcu porttitor felis ut vestibulum dui. Lorem ipsum
            dolor s adipiscing elit. A hac arcu porttitortetur adipiscing elit.
            A hac arcu porttitor felis ut vestibulum dui. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. A hac arcu porttitor felis ut
            vestibulum dui. Lorem ipsu arcu porttitor felis ut vestibulum dui
            Lorem ipsum dolor sit amet, consectetur addolor sit amet,
            consectetur adipiscing elit. A hac arcu porttitor felis ut
            vestibulum dui. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. A hac arcu porttitor felis ut vestibulum dui. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. A hac arcu porttitor
            felis ut vestibulum dui. Hello what are you doing here, i am so
          </p>
          <div className="ace__about-us__description__button-container">
            <div className="ace__about-us__description__button-blue">
              <p>Download App</p>
            </div>
            <div className="ace__about-us__description__button-white">
              <p>Read More</p>
            </div>
          </div>
        </div>
      </div>
      {/* App Features */}
      <div className="ace__home__app-features-maintext">
        <h1>App Features</h1>
      </div>

      <div className="ace__home__app-features__container">
        <div className="ace__home__app-features-section1">
          <App_Features_card
            title="Athletes Coaching"
            description="vestibulum dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. A hac arcu porttitor felis ut vestibulum dui."
          />
          <App_Features_card
            title="Trainings"
            description="vestibulum dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. A hac arcu porttitor felis ut vestibulum dui."
          />
        </div>
        <div className="ace__home__app-features-section2">
          <img src={iphone} />
        </div>
        <div className="ace__home__app-features-section3">
          <App_Features_card
            title="Scouting"
            description="vestibulum dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. A hac arcu porttitor felis ut vestibulum dui."
          />
          <App_Features_card
            title="Events & Listings"
            description="vestibulum dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. A hac arcu porttitor felis ut vestibulum dui."
          />
        </div>
      </div>
      {/* Testimonials */}
      <div className="ace__home__testimonials">
        <h1>Testimonials</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. A hac arcu
          porttitor
        </p>
        <div className="ace__home__testimonials__quotes-container">
          <Quotes />
          <Quotes />
          <Quotes />
        </div>
      </div>

      {/* Download App */}
      <div className="ace__home__app-download">
        <h1>Download The App</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. A hac arcu
          porttitor
        </p>

        <div className="ace__home__app-download__btn">
          <p>Download App</p>
        </div>
        <div className="ace__home__app-download__img">
          <img src={mobileView} />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
