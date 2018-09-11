window.kananChart = (function () {
    function KananChart(el) {
        this.el = el;
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

        this.el = document.createElement('div');
        this.el.classList.add('kanan-chart-candle');

        if (this.open > this.close) {
            this.el.style.color = '#00f';
            this.el.innerText = 'fall';
        } else if (this.open < this.close) {
            this.el.style.color = '#f00';
            this.el.innerText = 'rise';
        } else {
            this.el.innerText = 'even';
        }
    }

    var kananChart = {
        charts: [],
        get: function (selector) {
            var el;
            if (typeof selector === 'string') {
                el = document.getElementById(selector);
            } else if (selector.length) {
                el = selector[0];
            } else {
                el = selector;
            }

            return new KananChart(el);
        },
        chart: function (selector, options) {
            var chartParent = new KananChart(document.querySelector(selector));
            if (!chartParent) {
                return Error('can not find element');
            }

            var el = document.createElement('div');

            if (options.series) {
                var candles = document.createElement('div');
                candles.classList.add('kanan-chart-candles');
                options.series.forEach(function (s) {
                    var candle = new Candle(s);
                    candles.append(candle.el);
                });

                el.append(candles);
            }

            chartParent.el.append(el);

            if (!options.id) {
                options.id = 'default-id-test';
            }

            chartParent.id = options.id;
            this.charts.push(chartParent);

            return chartParent;
        },
        add: function (data) {
            console.log(this);
        }
    };

    return kananChart;
}());
