export const compressionDotsData = Object.freeze({
  type: 'line',
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
