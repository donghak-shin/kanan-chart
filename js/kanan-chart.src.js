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
                chartElement.append(candlesElement);
            }

            candles.forEach(function (candle) {
                var el = candle.el;
                if (el === undefined) {
                    el = document.createElement('div');
                    el.className = 'kanan-chart-candle';

                    candle.el = el;
                    candlesElement.append(el);
                }

                el.innerHTML = candle.change;
            });
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
            this.change = 'fall';
        } else if (this.open < this.close) {
            this.change = 'rise';
        } else {
            this.change = 'even';
        }
    }

    var kananChart = {
        charts: [],
        get: function (id) {
            // var el;
            // if (typeof selector === 'string') {
            //     el = document.getElementById(selector);
            // } else if (selector.length) {
            //     el = selector[0];
            // } else {
            //     el = selector;
            // }

            // return new KananChart(el);

            return this.charts.find(function (chart) {
                return chart.id === id;
            });
        },
        chart: function (selector, options) {
            var chartParent = new KananChart(document.querySelector(selector));
            if (!chartParent) {
                return Error('Can not find element');
            }

            // var el = document.createElement('div');

            var candles = [];
            if (options.series) {
                // var candles = document.createElement('div');
                // candles.classList.add('kanan-chart-candles');
                options.series.forEach(function (s) {
                    var candle = new Candle(s);
                    // candles.append(candle.el);
                    candles.push(candle);
                });

                // el.append(candles);
            }

            // chartParent.el.append(el);
            chartParent.candles = candles;

            if (!options.id) {
                options.id = 'default-id-test';
            }

            chartParent.id = options.id;
            this.charts.push(chartParent);

            chartParent.render(options.id);
            return chartParent;
        }
    };

    return kananChart;
}());
