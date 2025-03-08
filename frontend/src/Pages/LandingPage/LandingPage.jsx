import React from "react";
import heroimg from "../../assets/Images/heroimg1.png";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
    const services = [
        { name: "Electrical", description: "Reliable elect      rical services for installations and repairs." },
        { name: "Plumbing", description: "Expert plumbing services for residential and commercial needs." },
        { name: "Installation", description: "Professional installation services for all types of equipment." },
        { name: "Maintenance", description: "Regular maintenance services to keep your equipment running smoothly." },
        { name: "Television", description: "Television repair and installation services." },
        { name: "System", description: "Computer system repair and maintenance services." },
        { name: "AC", description: "Air conditioning installation and repair services." },
        { name: "RO", description: "RO water purifier installation and maintenance services." },
        { name: "Washing Machine", description: "Washing machine repair and maintenance services." },
        { name: "Refrigerator", description: "Refrigerator repair and maintenance services." },
        { name: "Microwave Oven", description: "Microwave Oven repair and maintenance services." },
        { name: "Cleaning", description: "Professional cleaning services for homes and offices." },
    ];

    return (
        <>
            <div id="home" className="home-page">
                <h3>LOCOS</h3>
                <section className="hero">
                    <h1>
                        Find the <span>Best Technicians</span>
                    </h1>
                    <h1>for Your Needs</h1>
                    <p>
                        Connect with local professionals for plumbing, electrical work, cleaning, and more.
                    </p>
                    <Link to="/signUp">
                        <button className="btn-dark">Get Started →</button>
                    </Link>
                </section>
            </div>

            <div className="white-space">
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services-page">Services</a></li>
                        <li><Link to="/signup" className="hs-link">Work with us</Link></li>
                        <li><a href="#footer">About us</a></li>
                        <Link to="/signIn">
                            <button className="btn-dark">Login</button>
                        </Link>
                    </ul>
                </nav>
                <img src={heroimg} alt="Technician at work" />
            </div>

            <section className="benefit-section">
                <h2>Why Choose Us?</h2>
                <div className="cards-section">
                    <div className="cards">
                        <i className="fa-solid fa-lock"></i>
                        <h3>Secure Payments</h3>
                        <p>Our platform ensures secure transactions with trusted payment gateways.</p>
                    </div>
                    <div className="cards">
                        <i className="fa-solid fa-user-tie"></i>
                        <h3>Verified Professionals</h3>
                        <p>We rigorously vet our freelancers to ensure quality service.</p>
                    </div>
                    <div className="cards">
                        <i className="fa-solid fa-ranking-star"></i>
                        <h3>Quality Talent</h3>
                        <p>Access a diverse pool of skilled freelancers for your project needs.</p>
                    </div>
                </div>
            </section>

            <div id="services-page">
                <h1>Our Services</h1>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className="service-card" key={index}>
                            <h2>{service.name}</h2>
                            <p>{service.description}</p>
                            <Link to="/login">
                                <button>Book Now</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <footer id="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>About Us</h3>
                        <p>We connect talented professionals with clients seeking top-notch services.</p>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><a href="#footer">About</a></li>
                            <li><a href="#services-page">Services</a></li>
                            <li><a href="#footer">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>Email: support@locos.com</li>
                            <li>Phone: 123456789</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Locos. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default LandingPage;
