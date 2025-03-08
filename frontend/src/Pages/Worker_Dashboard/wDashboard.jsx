import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ONGOING_JOBS, FETCH_JOB_COUNT, CANCEL_JOB, COMPLETE_JOB } from "../graphql/queries";
import { setJobCounts, setOngoingJobs } from "../redux/jobSlice";

export const TDashboard = () => {
  const dispatch = useDispatch();
  const { ongoingJobs, completedJobs, inProgressJobs, pendingJobs } = useSelector(state => state.jobs);
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState("");
  const [customer, setCustomer] = useState(null);

  const { data: jobData } = useQuery(FETCH_ONGOING_JOBS, {
    variables: { userId: "currentUserId" }, // Replace with actual user ID
    onCompleted: data => dispatch(setOngoingJobs(data.ongoingJobs))
  });

  const { data: jobCounts } = useQuery(FETCH_JOB_COUNT, {
    variables: { servicerId: "currentUserId" },
    onCompleted: data => dispatch(setJobCounts(data.jobCounts))
  });

  const [cancelJob] = useMutation(CANCEL_JOB);
  const [completeJob] = useMutation(COMPLETE_JOB);

  const handleComplete = async (job) => {
    setCustomer(job);
    setShowCompleteForm(true);
    const response = await completeJob({ variables: { custId: job.customerId } });
    setVerify(response.data.completeJob.otp);
  };

  const handleCancel = () => {
    setVerify(null);
    setShowCompleteForm(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (otp === verify) {
      await completeJob({ variables: { id: customer.id } });
      setShowCompleteForm(false);
      window.location.reload();
    } else {
      alert("Entered OTP is incorrect");
    }
  };

  const handleCancelJob = async (job) => {
    await cancelJob({ variables: { custId: job.customerId, id: job.id } });
    window.location.reload();
  };

  const chartData = {
    labels: ["In Progress", "Pending", "Completed"],
    datasets: [
      {
        label: "Jobs",
        data: [inProgressJobs, pendingJobs, completedJobs],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <div className="dashboard-boxes">
        <h2>Locos</h2>
        <div className="stats-grid">
          <div className="stat-box"><span>{inProgressJobs}</span></div>
          <div className="stat-box"><span>{pendingJobs}</span></div>
          <div className="stat-box"><span>{completedJobs}</span></div>
        </div>
      </div>
      <div className="techdash">
        <h3>Ongoing Works</h3>
        <ul className="tech-ongoing-jobs-list">
          {ongoingJobs.map((job) => (
            <li key={job.id}>
              <h4>{job.service}</h4>
              <p>Provider: {job.customerName}</p>
              <button onClick={() => handleCancelJob(job)}>Cancel</button>
              <button onClick={() => handleComplete(job)}>Complete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="tech-chart-container">
        <Bar data={chartData} />
      </div>
    </>
  );
};
