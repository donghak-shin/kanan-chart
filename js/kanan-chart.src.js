window.kananChart = (function () {
    function KananChart(el) {
        this.el = el;

        this.render = function () {
            var chart = this;
            var candles = chart.candles;

            var chartElement = chart.el;
            var candlesElement = chart.el.getElementsByClassName('kanan-chart-candles');

            if (candlesElement.length > 0) {
                candlesElement = candlesElement[0];
            } else {
                candlesElement = document.createElement('div');
                candlesElement.className = 'kanan-chart-candles';
                candlesElement.style.position = 'relative';
                chartElement.append(candlesElement);
            }

            candles.forEach(function (candle) {
                var el = candle.el;
                if (el === undefined) {
                    el = document.createElement('div');
                    el.className = 'kanan-chart-candle';
                    el.style.position = 'absolute';

                    candle.el = el;
                    candlesElement.append(el);
                }

                // FIXME: wtf
                el.style.backgroundColor = candle.change === 1 ?
                                 'red' :
                                 candle.change === -1 ?
                                 'blue' :
                                 'black';
                el.style.left = (candle.id * 5) + 'px';
                el.style.top = chart.el.clientHeight - candle.open + 'px';
                el.style.width = '4px';
                el.style.height = ((candle.high - candle.low) || 1) + 'px';
            });
        }

        this.setData = function (data) {
            if (!Array.isArray(data)) {
                return Error('Data must be an array');
            }

            var candles = [];

            data.forEach(function (s) {
                var candle = new Candle(s);
                candles.push(candle);
            });

            this.candles = candles;
            this.render();
        }

        this.addPoint = function (point) {
            if (point === undefined) {
                return Error('Point must not be empty');
            }

            if (!point instanceof Object && !Array.isArray(point)) {
                return Error('Point must be an object/array');
            }

            this.candles.push(new Candle(point));
            this.render();
        }
    }

    function Candle(options) {
        if (Array.isArray(options)) {
            this.id = options[0];
            this.open = options[1];
            this.high = options[2];
            this.low = options[3];
            this.close = options[4];
        } else {
            this.id = options.id;
            this.open = options.open;
            this.high = options.high;
            this.low = options.low;
            this.close = options.close;
        }

        if (this.open > this.close) {
            this.change = -1;
        } else if (this.open < this.close) {
            this.change = 1;
        } else {
            this.change = 0;
        }
    }

    var kananChart = {
        charts: [],
        get: function (id) {
            return this.charts.find(function (chart) {
                return chart.id === id;
            });
        },
        chart: function (selector, options) {
            var chartParent = new KananChart(document.querySelector(selector));
            if (!chartParent) {
                return Error('Can not find element');
            }

            chartParent.userOptions = options;

            var candles = [];
            if (options.data) {
                options.data.forEach(function (s) {
                    var candle = new Candle(s);
                    candles.push(candle);
                });
            }

            chartParent.candles = candles;

            if (!options.id) {
                options.id = 'default-id-test';
            }

            chartParent.id = options.id;
            this.charts.push(chartParent);

            chartParent.render();
            return chartParent;
        }
    };

    return kananChart;
}());
