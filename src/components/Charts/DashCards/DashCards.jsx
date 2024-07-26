import React, { useState } from "react";
import "./DashCards.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { Expandedata } from "../../../data/CardsData";

// Parent Card
const DashCards = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  const cardStyle = {
    background: param.color.background,
    boxShadow: param.color.boxShadow,
    width: param.width || '31rem' // Default width if not provided
  };

  return (
    <motion.div
      className="CompactCard"
      style={cardStyle}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const cardStyle = {
    background: param.color.background,
    boxShadow: param.color.boxShadow,
    width: param.expandedWidth || '60%' // Default expanded width if not provided
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={cardStyle}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="ChartContainer">
        <Chart options={Expandedata.options} series={param.series} type="area" />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default DashCards;
