import React from 'react'
import DashCards from "../../../components/Charts/DashCards/DashCards"
import { CardsData } from '../../../data/CardsData'
import "./MainDash.css";
import LineChart from '../../../components/Charts/LineChart/LineChart';
import ProgressChart from "../../../components/Charts/ProgressChart/ProgressChart"
import BasicTable from "../../../components/Table/Table"

const MainDash = () => {
  return (
    <>
    <div>
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
                series={card.series} />
            </div>
          );
        })},
      </div>
    </div>
     <div className='charts'>
     <div className="LineChart">
      <LineChart/>
      </div>
      <ProgressChart/>
      </div>

      <BasicTable/>
      </>
  )
}

export default MainDash
