'use strict'
import Candle from './Candle'

export default class Chart {
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
            let candlesElement = this.el.getElementsByClassName('kanan-chart-candles')

            if (candlesElement.length === 0) {
                candlesElement = document.createElement('div')
                candlesElement.className = 'kanan-chart-candles'
                candlesElement.style.position = 'relative'
            } else {
                candlesElement = candlesElement[0]
            }

            this.candles.forEach((candle, i) => {
                const el = document.createElement('div')
                const color = candle.close > candle.open ?
                    this.colors.rise :
                    candle.close < candle.open ?
                        this.colors.fall :
                        this.colors.even
                el.className = 'kanan-chart-candle'
                el.style.position = 'absolute'
                candle.el = el

                const ratio = this.el.clientHeight / (this.max - this.min)
                el.style.border = '2px solid #fff'
                el.style.borderTop = '0 none'
                el.style.borderBottom = '0 none'
                el.style.backgroundColor = color
                el.style.left = (i * 6) + 'px'
                el.style.top = (this.max - candle.high) * ratio + 'px'
                el.style.width = '5px'
                el.style.height = ((candle.high - candle.low) * ratio || 1) + 'px'

                const innerEl = document.createElement('div')
                innerEl.className = 'kanan-chart-candle-inner'
                innerEl.style.position = 'absolute'
                innerEl.style.backgroundColor = color
                innerEl.style.left = '-2px'
                innerEl.style.top = (candle.high - Math.max(candle.open, candle.close)) * ratio + 'px'
                innerEl.style.width = '5px'
                innerEl.style.height = (Math.abs(candle.open - candle.close) * ratio || 1) + 'px'

                el.appendChild(innerEl)
                candlesElement.appendChild(el)
            })

            this.el.appendChild(candlesElement)
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

            let candlesElement = this.el.getElementsByClassName('kanan-chart-candles')

            if (candlesElement.length > 0) {
                candlesElement[0].remove()
            }

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