import React from 'react';
import Chart from 'chart.js';
import Moment from 'moment';

export default class SingleLineChart extends React.Component
{
    render()
    {
        return (
            <canvas ref="canvas" />
        );
    }

    componentDidMount()
    {

        let canvas = this.refs.canvas.getDOMNode().getContext("2d");

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

                        return "$" + dataValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
