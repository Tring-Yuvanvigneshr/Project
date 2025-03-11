import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKINGS_BY_WORKER } from '../../graphQl/queries/userQueries.js';
import './serviceHistory.css';
import { useSelector } from 'react-redux';
import { CircularProgress, FormControl, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WServiceHistory = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();
  const worker = useSelector(state => state.worker.workerDetails);

  const { loading, error, data } = useQuery(GET_BOOKINGS_BY_WORKER, {
    variables: { worker_id: worker?.id },
    fetchPolicy: "network-only"
  });

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredBookings = data?.getBookingsByWorker?.filter((booking) =>
    filterStatus ? booking.status.toLowerCase() === filterStatus.toLowerCase() : true
  );

  if (loading) return <div className='loading'><CircularProgress /></div>;
  if (error) return <div className='error'>Failed to fetch service history</div>;

  const handleCardClick = (booking) => {
    navigate(`/booking-details/${booking.id}`);
  };

  return (
    <div className='service-history'>
      <div className='filter-container'>
        <h2>Service History</h2>
        <FormControl size="small" className='filter-dropdown'>
          <Select
            value={filterStatus}
            onChange={handleFilterChange}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Accepted">Accepted</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='booking-list'>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div 
              key={booking.id} 
              className='booking-card' 
              onClick={() => handleCardClick(booking)}
            >
              <div className='left-section'>
                <div><strong>Job:</strong> {booking.job_description}</div>
                <div><strong>Status:</strong> 
                  <span className={`status-${booking.status.toLowerCase()}`}>{booking.status}</span>
                </div>
                <div><strong>Payment:</strong> {booking.payment_status}</div>
                <div><strong>Booking In:</strong> {new Date(parseInt(booking.created_at)).toLocaleString()}</div>
              </div>

              <div className='right-section'>
                <div><strong>Scheduled:</strong> {new Date(parseInt(booking.scheduled_time)).toLocaleString()}</div>
                {booking.completed_time && (
                  <div><strong>Completed:</strong> {new Date(parseInt(booking.completed_time)).toLocaleString()}</div>
                )}
                <button className='view-details-btn'>
                  View Details →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No service history available.</p>
        )}
      </div>
    </div>
  );
};

export default WServiceHistory;
