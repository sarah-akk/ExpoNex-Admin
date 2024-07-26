// src/components/ExpoDetails/Analytics.js
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ApexChart from '../../../components/Charts/ApexChart/ApexChart';
import './Analytics.css';
import { CardsData } from '../../../data/CardsData';
import DashCards from '../../../components/Charts/DashCards/DashCards';
import LineChart from '../../../components/Charts/LineChart/LineChart';
import Reviews from "../../../components/Reviews/Reviews"
const Analytics = () => {
const { expo } = useOutletContext();

  return (
    <div className='Analytics-div'>
      <div className="Analytics-Cards">
       <div className="Cards">
        {CardsData.map((card, id) => {
          return (
            <div className="parentContainer">
              <DashCards
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series} 
                width="26rem"
                />
            </div>
          );
        })}
        </div>
        <div className="Analytics-Charts">
        <ApexChart/>
        <div className='Analytics-LineChart'>
          <LineChart/>
         </div>
        </div>
       </div>
       <Reviews/>

      <div>
      </div>
    </div>
   
    
  );
};

export default Analytics;
