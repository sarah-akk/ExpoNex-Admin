import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";
import logo from "../../assets/logos/logo.png";

const StartPage = () => {
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate("/authentication/sign-in");
  };

  return (
    <>
      <div className="container">
        <div className="diagonal-square"></div>
        <div className="diagonal-square_2"></div>
        <img src={logo} alt="Your Image" className="logo" />
        <div className="line"></div>
      </div>
      <div>
        <button className="navigate-button" onClick={navigateToPage}>
          Get Started
        </button>
      </div>
    </>
  );
};

export default StartPage;
