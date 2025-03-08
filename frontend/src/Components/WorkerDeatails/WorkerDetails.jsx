import React from "react";
import { useParams } from "react-router-dom";
import "./workerDetails.css";

const workersData = [
    {
        id: "1",
        name: "John Doe",
        profession: "Plumber",
        experience: "5 years",
        rating: 4.8,
        reviews: [
            { user: "Alice", comment: "Great service, very professional!", rating: 5 },
            { user: "Bob", comment: "Fixed my leak quickly. Highly recommend!", rating: 4.5 },
        ],
        image: "https://via.placeholder.com/150",
        bio: "Expert plumber with over 5 years of experience in fixing leaks, installing pipes, and maintenance.",
        availability: "Available Now",
        price: "$50 per hour",
    },
    {
        id: "2",
        name: "Mike Smith",
        profession: "Electrician",
        experience: "8 years",
        rating: 4.6,
        reviews: [
            { user: "Charlie", comment: "Very knowledgeable and skilled!", rating: 5 },
            { user: "Dave", comment: "Quick and efficient. Will hire again!", rating: 4.2 },
        ],
        image: "https://via.placeholder.com/150",
        bio: "Experienced electrician specializing in wiring, repairs, and installations.",
        availability: "Available Next Week",
        price: "$40 per hour",
    },
];

const WorkerDetails = () => {
    const { id } = useParams();
    const worker = workersData.find((worker) => worker.id === id);

    if (!worker) {
        return <div className="worker-details-container"><h2>Worker Not Found</h2></div>;
    }

    return (
        <div className="worker-container">
            <div className="worker-details-container">
                <div className="worker-left">
                    <div className="worker-profile">
                        <img src={worker.image} alt="Worker" className="worker-image" />
                        <div className="worker-info">
                            <h2>{worker.name}</h2>
                            <p><strong>Profession:</strong> {worker.profession}</p>
                            <p><strong>Experience:</strong> {worker.experience}</p>
                            <p><strong>Rating:</strong> ⭐ {worker.rating}/5</p>
                            <p className="worker-bio">{worker.bio}</p>
                        </div>
                    </div>

                    <div className="reviews-section">
                        <h3>Customer Reviews</h3>
                        {worker.reviews.length > 0 ? (
                            worker.reviews.map((review, index) => (
                                <div key={index} className="review-card">
                                    <p className="review-user"><strong>{review.user}</strong></p>
                                    <p className="review-text">"{review.comment}"</p>
                                    <p className="review-rating">⭐ {review.rating}/5</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                </div>


                <div className="worker-right">
                    <div className="booking-section">
                        <h3>Booking Details</h3>
                        <p><strong>Availability:</strong> {worker.availability}</p>
                        <button className="booking-button">Book Now</button>
                    </div>

                    <div className="chat-section">
                        <h3>Chat with {worker.name}</h3>
                        <div className="chat-box">

                        </div>
                        <input type="text" className="chat-input" placeholder="Type a message..." />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerDetails;
