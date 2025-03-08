import React from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import ServiceStats from "../ServiceStats/ServiceStats";
import ServiceHistory from "../ServiceHistory/ServiceHistory";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <ProfileInfo />
      {/* <ServiceStats /> */}
    </div>
  );
};

export default Dashboard;
