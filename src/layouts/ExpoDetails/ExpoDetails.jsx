// src/pages/ExpoDetails/ExpoDetails.js
import React from 'react';
import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import { staticExpos } from '../../data/ExposData';
import "./ExpoDetails.css";
import SearchBar from '../../components/SearchBar/SearchBar';
import { FaArrowLeft } from 'react-icons/fa'; 

const ExpoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const expo = staticExpos.find(expo => expo.id === parseInt(id));

  if (!expo) {
    return <p>Expo not found</p>;
  }

  return (
    <>
      <SearchBar />
      <div className="expo-details">
        <div>
         
          <div className="expo-details-nav">
          <button onClick={() => navigate("/dashboard/Activity")} className="back-button">
          <FaArrowLeft />
          </button>
            <Link to="details">Details</Link>
            <Link to="sections">Sections</Link>
            <Link to="analytics">Analytics</Link>
          </div>
          <div className="expo-details-content">
            <Outlet context={{ expo }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpoDetails;
