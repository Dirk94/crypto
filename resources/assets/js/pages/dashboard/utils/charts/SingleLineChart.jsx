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

    componentWillReceiveProps(nextProps)
    {
        this.chart.data.datasets[0].data = nextProps.data;
        this.chart.update();
    }

    componentDidMount()
    {
        this.createChart(this.props);
    }

    createChart(props)
    {
        let canvas = document.getElementById(this.id).getContext("2d");

        let options = {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(label, index, labels) {
                            return String.formatAsMoney(label, 0);
                        },
                        beginAtZero: false,
                        fontColor: 'white',
                    },
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'white',
                        maxTicksLimit: 10,
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
            labels: props.labels,
            datasets: [{
                label: props.datasetLabel,
                data: props.data,
                borderColor: props.color,
                fill: true,

                borderWidth: 2,
                lineTension: 0,

                pointRadius: 2,
                pointHitRadius: 7,
                pointBackgroundColor: props.color,
                pointBorderColor: props.color,
            }],
        };

        this.chart = new Chart(canvas, {
            type: 'line',
            options: options,
            data: data,
        });
    }
}
