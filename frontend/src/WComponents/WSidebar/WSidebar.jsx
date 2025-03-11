import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./wsidebar.css";
import { useSelector } from "react-redux";
import Navbar from './../Wnavbar/Wnavbar.jsx';


const WSidebar = () => {
  const location = useLocation();
  // const { name } = useSelector((state) => state.worker.workerDetails)

  return (
    <div>
      <Navbar />
      <div className="custom-sidebar">
      <nav>
        <ul className="custom-nav-list">
          <li>
            <Link 
              to="/bookings" 
              className={location.pathname === "/bookings" ? "custom-active" : ""}
            >
              📅 Bookings
            </Link>
          </li>
          <li>
            <Link 
              to="/wHistory" 
              className={location.pathname === "/wHistory" ? "custom-active" : ""}
            >
              🛠 Service History
            </Link>
          </li>
          <li>
            <Link to="/" className="custom-logout">
              🚪 Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </div>

    
  );
};

export default WSidebar;
