var chart = kananChart.chart('#kanan-chart', {
  data: [
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
  data: [
    [1, 100, 109, 99, 108],
    [2, 109, 111, 105, 110],
    [3, 113, 113, 108, 108],
    [4, 104, 107, 100, 101],
    [5, 100, 102, 96, 99],
    [6, 92, 92, 92, 92],
    [7, 88, 89, 84, 87]
  ]
});
