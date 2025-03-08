import React from 'react';
import './serviceHistory.css'; 

const ServiceHistory = () => {
  return (
    <div className="service-history-container">
      <h2>Your Service History</h2>
      <div className="service-history-table">
        <table>
          <thead>
            <tr>
              <th>Service Type</th>
              <th>Provider Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="no-records">No Job Records</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceHistory;
