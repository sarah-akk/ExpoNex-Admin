import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Expo from "../../../assets/images/Expo.jpg";
import location from "../../../assets/images/location.jpg";
import location2 from "../../../assets/icons/location2.png";
import "./Details.css";

const Details = () => {
  const { expo } = useOutletContext();

  return (
    <><div className='expo-details-div'>
      <div>
        <h2>{expo.name}</h2>
        <img src={Expo} alt={expo.name} className="expo-details-image" />
        <img src={location} className="expo-location-image" />

      </div>
      <div className="expo-details-info">
        <p>{expo.description}</p>
        <p>Categories:</p>
        <div className="expo-details-categories">
          <ul>
            {expo.category.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
        <p>Start at: {expo.date}</p>
        <p>Ends at: {expo.date}</p>
        <p className='status'>Status: running</p>
        <div className="expo-location-div">     
         <img src={location2} className="expo-location-icon" />
          <p>location: damascus , syria </p>
       </div>


      </div>

    </div>
    </>
  );
}

export default Details;
