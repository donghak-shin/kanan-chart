'use strict';

window.KananChart = (() => {
    class KananChart {
        constructor(el, options) {
            this.el = el
            this.id = options.id || 'default-id-test'
            this.candles = []
            this.min = null
            this.max = null
            this.colors = {
                rise: '#f51818',
                fall: '#1b61d1',
                even: '#2b2b2b'
            }

            let isDragging = false
            let startX = null
            let scrollLeft = null

            this.el.addEventListener('mousedown', (e) => {
                isDragging = true
                startX = e.pageX - this.el.offsetLeft
                scrollLeft = this.el.scrollLeft
            })

            this.el.addEventListener('mouseup', () => {
                isDragging = false
            })

            this.el.addEventListener('mousemove', (e) => {
                if (!isDragging) return
                e.preventDefault()

                const x = e.pageX - this.el.offsetLeft
                const walk = x - startX
                this.el.scrollLeft = scrollLeft - walk
            })

            this.render = () => {
                const chartElement = this.el
                let candlesElement = this.el.getElementsByClassName('kanan-chart-candles')

                if (candlesElement.length > 0) {
                    candlesElement[0].remove()
                }

                candlesElement = document.createElement('div')
                candlesElement.className = 'kanan-chart-candles'
                candlesElement.style.position = 'relative'

                this.candles.forEach((candle, i) => {
                    const el = document.createElement('div')
                    el.className = 'kanan-chart-candle'
                    el.style.position = 'absolute'
                    candle.el = el
                    candlesElement.appendChild(el)

                    const ratio = this.el.clientHeight / (this.max - this.min)
                    el.style.backgroundColor = candle.change === 1 ?
                        this.colors.rise :
                        candle.change === -1 ?
                            this.colors.fall :
                            this.colors.even
                    el.style.left = (i * 5) + 'px'
                    el.style.top = (this.max - candle.high) * ratio + 'px'
                    el.style.width = '4px'
                    el.style.height = ((candle.high - candle.low) * ratio || 1) + 'px'
                })

                chartElement.appendChild(candlesElement)
            }

            this.setData = (data) => {
                if (!Array.isArray(data)) {
                    return Error('Data must be an array')
                }

                this.min = null
                this.max = null

                const candles = []

                data.forEach((s) => {
                    const candle = new Candle(s)

                    if (!this.min || this.min > candle.low) {
                        this.min = candle.low
                    }

                    if (!this.max || this.max < candle.high) {
                        this.max = candle.high
                    }

                    candles.push(candle)
                })

                this.candles = candles
                this.render()
                this.el.scrollLeft = this.el.scrollLeftMax
            }

            this.addPoint = (point) => {
                if (point === undefined) {
                    return Error('Point must not be empty')
                }

                if (!point instanceof Object && !Array.isArray(point)) {
                    return Error('Point must be an object/array')
                }

                const candle = new Candle(point)
                this.candles.push(candle)

                if (!this.min || this.min > candle.low) {
                    this.min = candle.low
                }

                if (!this.max || this.max < candle.high) {
                    this.max = candle.high
                }

                this.render()
            }
        }
    }

    class Candle {
        constructor(options) {
            if (Array.isArray(options)) {
                this.id = options.length === 5 ? options.shift() : null
                this.open = options[0]
                this.high = options[1]
                this.low = options[2]
                this.close = options[3]
            } else {
                this.id = options.id
                this.open = options.open
                this.high = options.high
                this.low = options.low
                this.close = options.close
            }

            if (this.open > this.close) {
                this.change = -1
            } else if (this.open < this.close) {
                this.change = 1
            } else {
                this.change = 0
            }
        }
    }

    const kananChart = {
        charts: [],
        get: function (id) {
            return this.charts.find((chart) => {
                return chart.id === id
            })
        },
        chart: function (selector, options) {
            const element = document.querySelector(selector)

            if (element === null) {
                return Error('Can not find element')
            }

            const chart = new KananChart(element, options)

            if (options.data) {
                chart.setData(options.data)
            }

            this.charts.push(chart)

            return chart
        },
        test: () => {
            charts
        }
    }

    return kananChart
})()
