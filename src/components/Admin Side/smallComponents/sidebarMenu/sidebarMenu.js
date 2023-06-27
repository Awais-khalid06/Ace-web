import React from "react";
import "./sideBarMenu.css";
import { Link } from "react-router-dom";

const SidebarMenu = ({
  icon,
  text,
  style,
  number,
  imageStyle,
  fontSize,
  navLink,
  onClick,
  color,
}) => {
  return (
    <div className="ace-admin-siderbar-menu-component" onClick={onClick}>
      <Link style={{ color: color }} to={navLink}>
        <img style={imageStyle} src={icon} alt="home-icon" />
        <p style={{ fontSize: fontSize, color: color }}>{text}</p>

        <div className="ace-admin-sidebar-menu-numberOfMessage" style={style}>
          <p>{number}</p>
        </div>
      </Link>
    </div>
  );
};

export default SidebarMenu;
