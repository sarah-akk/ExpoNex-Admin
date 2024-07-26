export  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        
        endingShape: 'rounded'
      },
    },
    colors: ['#d87634', '#33FF57', '#3357FF'], 
    dataLabels: {
    enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#d89f34']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    yaxis: {
      title: {
        text: 'Sales'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        }
      }
    }
  };

  export  const series = [
    {
      name: 'Sales',
      data: [44, 55, 57, 56, 61]
    }
  ];