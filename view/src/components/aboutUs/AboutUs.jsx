import React from "react";
import styles from "./aboutUs.module.css";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate=useNavigate();
  const handleHome=(e)=>{
    e.preventDefault();
    navigate("/")
  };
    return (
      <div className={`${styles.container}`}>
        <div className={`${styles.header}`}>
          <h1>Welcome to Just Do It!</h1>
          <p className={`${styles.subtitle}`}>Connecting Users with Professionals</p>
        </div>
        <div className={`${styles.content}`}>
          <div className={`${styles.section}`}>
            <h2>What is Just Do It?</h2>
            <p>Just Do It is a revolutionary platform designed to connect users with skilled professionals for their various needs. Whether you're looking for a photographer for your wedding, a plumber to fix a leaky faucet, or a graphic designer for your business logo, Just Do It has you covered.</p>
          </div>
          <div className={`${styles.section}`}>
            <h2>How Does It Work?</h2>
            <h3>For Users:</h3>
            <ol>
              <li><strong>Browse Professionals:</strong> Search through our database of skilled professionals based on your location and service requirements.</li>
              <li><strong>View Portfolios:</strong> Explore the portfolios of professionals to see examples of their work and decide if they're the right fit for your project.</li>
              <li><strong>Connect and Hire:</strong> Once you find the perfect professional, you can easily connect with them through our platform and hire them for your project.</li>
            </ol>
            <h3>For Professionals:</h3>
            <ol>
              <li><strong>Showcase Your Work:</strong> Create a stunning portfolio showcasing your best work to attract potential clients.</li>
              <li><strong>Increase Visibility:</strong> Just Do It provides you with a platform to increase your visibility and reach a wider audience of potential clients.</li>
              <li><strong>Get Hired:</strong> By showcasing your skills and experience on Just Do It, you increase your chances of being contacted and hired by users in need of your services.</li>
            </ol>
          </div>
          <div className={`${styles.section}`}>
            <h2>Why Choose Just Do It?</h2>
            <ul>
              <li><strong>Easy to Use:</strong> Our platform is user-friendly, making it easy for both users and professionals to navigate and find what they need.</li>
              <li><strong>Wide Range of Services:</strong> Whether you're a user or a professional, Just Do It offers a wide range of services to meet diverse needs.</li>
              <li><strong>Secure and Reliable:</strong> We prioritize the security and reliability of our platform, ensuring a safe and seamless experience for all users.</li>
            </ul>
          </div>
        </div>
        <div className={`${styles.footer}`}>
          <p>Get Started Today!</p>
          <button className={`${styles.signUpButton}`} onClick={handleHome}>Sign Up</button>
        </div>
        <div className={`${styles.developer}`}>
          <p>Developed by: Andrea Frabotta</p>
        </div>
      </div>
    );
 
};

export default AboutUs;
