import React from 'react';
import Chart from 'chart.js';

export default class BalanceChart extends React.Component {
    render() {
        return (
            <div className="statcard p-3">
                <canvas id="c-line-chart" />
            </div>
        );
    }

    componentDidMount() {
        let ctx = document.getElementById('c-line-chart');
        let options = {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                    }
                }]
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    beforeLabel: function(tooltipItem, data) {

                    },
                    label: function(tooltipItem, data) {
                        let index = tooltipItem.index;
                        let dataValue = data.datasets[0].data[index];

                        return "$" + dataValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            }
        };
        let data = {
            labels: ['26 Dec', '27 Dec', '28 Dec', '29 Dec', '30 Dec', '31 Dec', 'Yesterday'],
            datasets: [{
                label: "Portfolio Value",
                data: [9000, 10000, 9500, 10000, 11000, 12581, 12500],
                borderColor: 'rgba(40, 165, 213, 1)',
                fill: true,

                borderWidth: 4,
                lineTension: 0,

                pointRadius: 4,
                pointHitRadius: 30,
                pointBackgroundColor: 'rgba(40, 165, 213, 1)',
                pointBorderColor: 'rgba(40, 165, 213, 1)',

            }]
        };
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    }
}
