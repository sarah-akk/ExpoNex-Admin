import React from 'react'
import { motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "./ProgressChart.css";

const ProgressChart = () => {
  return (
    <div className='ProgressChart'>
      <motion.div
      className="ProgressChartTitle"
      style={{
        background: '#313131',
      }}
    >
      <div className="ProgressChartBar">
        <CircularProgressbar className='ProgressChartBar'
          value = "75"
          text="75%"
        />
      </div>
      <div className="detail">
      </div>
    </motion.div>
    </div>
  );
}

export default ProgressChart
