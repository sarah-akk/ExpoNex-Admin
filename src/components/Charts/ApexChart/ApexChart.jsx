import React from 'react'
import { chartOptions , chartSeries } from '../../../data/ApexChartData'
import Chart from 'react-apexcharts';
import { styled } from '@mui/system';
import './ApexChart.css';


const useStyles = styled((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    chartContainer: {
      backgroundColor: '#4d4c4c',
      padding: theme.spacing(2),
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      justifyContent : 'center'
    },
    chartTitle: {
      marginBottom: theme.spacing(2),
    },
  }));


const ApexChart = () => {

  const classes = useStyles();

  return (
 
    <div className={classes.chartContainer}>
      <h3 className={classes.chartTitle}>Overview</h3>
      <Chart options={chartOptions} series={chartSeries} type="pie" height={250} width={350} />
    </div>
  )
}

export default ApexChart
