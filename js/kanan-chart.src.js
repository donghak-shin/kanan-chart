'use strict';

window.KananChart = (function () {
    function KananChart(el) {
        this.el = el;
        this.candles = [];
        this.min = null;
        this.max = null;

        var isDragging = false;
        var startX = null;
        var scrollLeft = null;

        this.el.addEventListener('mousedown', function (e) {
            isDragging = true;
            startX = e.pageX - this.el.offsetLeft;
            scrollLeft = this.el.scrollLeft;
        }.bind(this));

        this.el.addEventListener('mouseup', function () {
            isDragging = false;
        }.bind(this));

        this.el.addEventListener('mousemove', function (e) {
            if (!isDragging) return;
            e.preventDefault();

            var x = e.pageX - this.el.offsetLeft;
            var walk = x - startX;
            this.el.scrollLeft = scrollLeft - walk;
        }.bind(this));

        this.render = function () {
            var candles = this.candles;

            var chartElement = this.el;
            var candlesElement = this.el.getElementsByClassName('kanan-chart-candles');

            if (candlesElement.length > 0) {
                candlesElement = candlesElement[0];
            } else {
                candlesElement = document.createElement('div');
                candlesElement.className = 'kanan-chart-candles';
                candlesElement.style.position = 'relative';
                chartElement.append(candlesElement);
            }

            candles.forEach(function (candle, i) {
                var el = candle.el;

                if (el === undefined) {
                    el = document.createElement('div');
                    el.className = 'kanan-chart-candle';
                    el.style.position = 'absolute';

                    candle.el = el;
                    candlesElement.append(el);
                }

                var ratio = this.el.clientHeight / (this.max - this.min);
                el.style.backgroundColor = candle.change === 1 ?
                                 'red' :
                                 candle.change === -1 ?
                                 'blue' :
                                 'black';
                el.style.left = (i * 5) + 'px';
                el.style.top = (this.max - candle.high) * ratio + 'px';
                el.style.width = '4px';
                el.style.height = ((candle.high - candle.low) * ratio || 1) + 'px';
            }.bind(this));
        };

        this.setData = function (data) {
            if (!Array.isArray(data)) {
                return Error('Data must be an array');
            }

            var candles = [];
            var _this = this;

            data.forEach(function (s) {
                var candle = new Candle(s);

                if (!_this.min || _this.min > candle.low) {
                    _this.min = candle.low;
                }

                if (!_this.max || _this.max < candle.high) {
                    _this.max = candle.high;
                }

                candles.push(candle);
            });

            this.candles = candles;
            this.render();
            this.el.scrollLeft = this.el.scrollLeftMax;
        }

        this.addPoint = function (point) {
            if (point === undefined) {
                return Error('Point must not be empty');
            }

            if (!point instanceof Object && !Array.isArray(point)) {
                return Error('Point must be an object/array');
            }

            var candle = new Candle(point);
            this.candles.push(candle);

            if (!this.min || this.min > candle.low) {
                this.min = candle.low;
            }

            if (!this.max || this.max < candle.high) {
                this.max = candle.high;
            }

            this.render();
        }
    }

    function Candle(options) {
        if (Array.isArray(options)) {
            this.id = options.length === 5 ? options.shift() : null;

            this.open = options[0];
            this.high = options[1];
            this.low = options[2];
            this.close = options[3];
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

            if (options.data) {
                chartParent.setData(options.data);
            }

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
