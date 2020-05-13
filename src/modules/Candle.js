'use strict'

export default class Candle {
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