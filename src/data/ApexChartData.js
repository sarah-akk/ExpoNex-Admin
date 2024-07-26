export const chartOptions = {
    chart: {
      type: 'pie',
      height: 250,
  
    },
    labels: ['Visitors', 'Page Views', 'Conversion Rate'],
    colors: ['#EFB359', '#d87634  ', '#FFD700'],
    legend: {
      position: 'bottom',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 100
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

export  const chartSeries = [1234, 5678, 2.3];