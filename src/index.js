'use strict'
import Chart from './modules/Chart'

window.KananChart = (() => {
    const chart = {
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

            const chart = new Chart(element, options)

            if (options.data) {
                chart.setData(options.data)
            }

            this.charts.push(chart)

            return chart
        }
    }

    return chart
})()
