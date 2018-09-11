var chart = kananChart.chart('#kanan-chart', {
  series: [
    {
      id: 1,
      open: 30,
      high: 40,
      low: 25,
      close: 35
    },
    [2, 40, 40, 30, 32],
    [3, 20, 20, 20, 20]
  ]
});

var chart2 = kananChart.chart('#suwawa-chart', {
  id: 'suwawa',
  series: [
    [1, 100, 113, 99, 108],
    [2, 108, 111, 108, 110],
    [3, 143, 143, 143, 143],
    [4, 156, 185, 144, 181],
    [5, 127, 132, 127, 127],
    [6, 89, 89, 89, 89]
  ]
});
