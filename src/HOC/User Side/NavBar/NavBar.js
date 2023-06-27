import "./Navbar.css";
import logo from "../NavBar/static/ace-logo.png";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";

import { Button, Menu } from "antd";
import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <>
      <div className="ace__hoc__navbar-container ">
        <div className="ace__hoc__navbar-link_logo">
          <img src={logo} />
        </div>
        <div className="ace__hoc__navbar-links_container">
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/about">About Us </Link>
          </p>
          <p>
            <Link to="/contact">Contact Us </Link>
          </p>
          <p>
            <Link to="/login">Login </Link>
          </p>
        </div>
        <div className="ace__hoc__navbar-coach_btn">
          <Link to="/signup">Team/Coach Signup </Link>
        </div>
        <div className="ace-hoc-navbar-menu">
          {toggleMenu ? (
            <div style={{ padding: "0 0 0 2rem" }}>
              <RiCloseLine
                color="#fff"
                size={27}
                onClick={() => setToggleMenu(false)}
              />
            </div>
          ) : (
            <div style={{ padding: "0 0 0 2rem" }}>
              <RiMenu3Line
                color="#fff"
                size={27}
                onClick={() => setToggleMenu(true)}
              />
            </div>
          )}
          {toggleMenu && (
            <div className="ace__navbar-menu_container scale-up-center">
              <div className="ace__hoc__navbar-menu-links_container">
                <p>
                  <Link to="/">Home</Link>
                </p>
                <p>
                  <Link to="/about">About Us </Link>
                </p>
                <p>
                  <Link to="/contact">Contact Us </Link>
                </p>
                <p>
                  <Link to="/login">Login </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
