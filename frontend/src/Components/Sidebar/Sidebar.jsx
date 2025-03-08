import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="custom-sidebar">
      <div className="custom-profile">
        <div className="custom-profile-pic"></div>
        <h3 className="custom-profile-name">Yuvan</h3>
      </div>
      <nav>
        <ul className="custom-nav-list">
          <li>
            <Link 
              to="/dashboard" 
              className={location.pathname === "/dashboard" ? "custom-active" : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/services" 
              className={location.pathname === "/services" ? "custom-active" : ""}
            >
              Services
            </Link>
          </li>
          <li>
            <Link 
              to="/history" 
              className={location.pathname === "/history" ? "custom-active" : ""}
            >
              Service History
            </Link>
          </li>
          <li>
            <Link to="/landing">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
