import React from 'react'
import {ReviewsData} from '../../data/ReviewsData';
import './Reviews.css'

const Reviews = () => {
    return (
      <div className="Updates">
        {ReviewsData.map((update) => {
          return (
            <div className="update">
              <img src={update.img} alt="profile" />
              <div className="noti">
                <div  style={{marginBottom: '0.5rem'}}>
                  <span>{update.name}</span>
                  <span> {update.noti}</span>
                </div>
                  <span>{update.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default Reviews;