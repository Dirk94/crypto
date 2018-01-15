import React from 'react';
import Chart from 'chart.js';
import String from "../../../../common/String.jsx";

export default class SingleLineChart extends React.Component
{
    constructor()
    {
        super();

        this.id = "id-" + Math.random().toString(36).substring(7);
    }

    render()
    {
        return (
            <canvas id={this.id} />
        );
    }

    componentDidMount()
    {
        let canvas = document.getElementById(this.id).getContext("2d");

        let options = {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                    },
                }],
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    label: function(tooltipItem, data) {
                        let index = tooltipItem.index;
                        let dataValue = data.datasets[0].data[index];

                        return String.formatAsMoney(dataValue);
                    },
                },
            },
        };

        let data = {
            labels: this.props.labels,
            datasets: [{
                label: this.props.datasetLabel,
                data: this.props.data,
                borderColor: this.props.color,
                fill: true,

                borderWidth: 4,
                lineTension: 0,

                pointRadius: 4,
                pointHitRadius: 30,
                pointBackgroundColor: this.props.color,
                pointBorderColor: this.props.color,
            }],
        };

        new Chart(canvas, {
           type: 'line',
           options: options,
           data: data,
        });
    }
}
