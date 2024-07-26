import React from "react";
import Chart from "react-apexcharts";
import {data} from "../../../data/LineChartData";
import "./LineChart.css";

const LineChart = () => {
 
  return (
      <Chart options={data.options} series={data.series} type="area" />
  );
};

export default LineChart;
