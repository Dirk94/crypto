import React from 'react';
import Chart from 'chart.js';
import String from "../../../../common/String.jsx";

export default class SingleLineChart extends React.Component
{
    constructor()
    {
        super();

        Chart.defaults.global.defaultFontColor = 'red';
        Chart.defaults.global.defaultFontFamily = '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif';
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
        this.chart.data.labels = nextProps.labels;
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
                    position: 'left',
                    offset: true,
                    ticks: {
                        padding: 12,
                        fontSize: 13,
                        maxTicksLimit: 8,
                        callback: function(label, index, labels) {
                            return String.formatAsMoney(label, 0);
                        },
                        beginAtZero: false,
                        fontColor: 'white',
                    },
                }],
                xAxes: [{
                    ticks: {
                        padding: 12,
                        fontSize: 13,
                        fontColor: 'white',
                        maxTicksLimit: 11,
                    },
                }],
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                displayColors: true,
                xPadding: 12,
                yPadding: 6,
                bodyFontSize: 13,
                multiKeyBackground: '#000',
                bodyFontStyle: 'bold',
                titleFontStyle: 'normal',
                callbacks: {
                    title: function(tooltipItem, data) {
                        let index = tooltipItem[0].index;
                        let labelValue = data.labels[index];
                        if (labelValue === "now") {
                            return "Now";
                        }
                        return "Today at " + labelValue;
                    },
                    label: function(tooltipItem, data) {
                        let index = tooltipItem.index;
                        let dataValue = data.datasets[0].data[index];

                        return " " + String.formatAsMoney(dataValue);
                    },
                },

            },
            hover: {
                mode: 'index',
                intersect: false,
            },
            layout: {

            }
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
                pointHitRadius: 1000,
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
