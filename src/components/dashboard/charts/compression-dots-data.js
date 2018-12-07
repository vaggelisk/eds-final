export const compressionDotsData = Object.freeze({
  type: 'line',
  labels: [ '10:00', '10:10', '10:20', '10:30', '10:40'],
  datasets: [{
    label: 'pressure',
    data: [3, 4, 1, 5, 6],
    pointBackgroundColor: 'black',
    pointRadius: 1,
    fill: '+2',
    showLine: true
  },{
    // label: 'pressure',
    data: [5, 6, 1, 7, 8],
    pointBackgroundColor: 'black',
    pointRadius: 1,
    fill: false,
    showLine: true
  },{
    // label: 'pressure',
    data: [7, 8, 1, 9, 10],
    pointBackgroundColor: 'black',
    pointRadius: 1,
    fill: false,
    showLine: true,
  }],
  options: {
    legend: {
      display:  false ,
    },
  }
});

export default compressionDotsData;
