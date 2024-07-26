import React from 'react';
import Chart from 'react-apexcharts';
import './BarChart.css';
import {options , series} from "../../../data/BarChartData";

const BarChart = () => {
 
  return (
    <div className="bar-chart">
      <Chart options={options} series={series} type="bar" height={200} />
    </div>
  );
}

export default BarChart;
