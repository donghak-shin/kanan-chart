# KananChart
Simple candle chart library.

## Example
```
const chart = KananChart.chart('#chart', {
    id: 'kospi',
    data: [
        [1906.07,1908.29,1880.71,1889.01],
        [1897.06,1929.82,1894.62,1922.77],
        [1931.25,1941.79,1911.63,1934.09],
        [1936.89,1957.51,1934.31,1947.56],
        [1906.42,1918.66,1894.29,1895.37],
        [1919.45,1928.76,1902.55,1928.76],
        [1922.00,1938.50,1918.57,1928.61],
        [1944.94,1956.89,1942.54,1945.82],
        [1953.51,1960.46,1932.87,1935.40],
        [1938.62,1938.62,1905.17,1922.17]
    ]
})
```

## APIs
### KananChart.chart(querySelector: string, options: object)
```
options: {
    id: string,
    data: array<data>
}

data
[
    id?: number | string,
    openPrice: number,
    highPrice: number,
    lowPrice: number
    closePrice: number
]
or
{
    id?: number | string,
    open: number,
    high: number,
    low: number,
    close: number
}
```

### KananChart.get(id: string)
return chart object

### KananChart.charts
return charts array

### Chart.render()
render chart

### Chart.setData(data: array<data>)
replace new data

### Chart.addPoint(data: data)
add new point