import React from 'react';
import Chart from 'chart.js';
import String from "../../../../common/String.jsx";

export default class SingleLineChart extends React.Component
{
    constructor()
    {
        super();

        Chart.defaults.global.defaultFontColor = 'white';
        Chart.defaults.global.defaultFontFamily = '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif';

        this.id = "id-" + Math.random().toString(36).substring(7);

        var resizeId;
        $(window).resize(() => {
            clearTimeout(resizeId);
            resizeId = setTimeout(() => {
                this.canvasWidth = document.getElementById(this.id).width;
                this.responsiveUpdateOfChart();

            }, 100);
        });
    }

    responsiveUpdateOfChart()
    {
        this.canvasWidth = document.getElementById(this.id).width;

        if (this.canvasWidth < 1200) {
            console.log("Setting the new small value!");
            this.chartDesktop.options.scales.yAxes[0].ticks.maxTicksLimit = 4;
            this.chartDesktop.data.datasets[0].pointRadius = 0;
            this.chartDesktop.update();
        } else {
            console.log("Setting the new large value!");
            this.chartDesktop.options.scales.yAxes[0].ticks.maxTicksLimit = 7;
            this.chartDesktop.data.datasets[0].pointRadius = 2;
            this.chartDesktop.update();
        }
    }

    render()
    {
        return (
            <div>
                <canvas id={this.id} />
            </div>
        );
    }

    componentWillReceiveProps(nextProps)
    {
        let maxValue = this.getMaxValueFromData(nextProps);
        this.maxIdentifier = '';
        if (maxValue >= 10000 && maxValue < 1000000) {
            this.maxIdentifier = 'k';
        } else if (maxValue >= 1000000 && maxValue <= 1000000000) {
            this.maxIdentifier = 'm';
        } else if (maxValue >= 1000000000) {
            this.maxIdentifier = 'b';
        }

        this.chartDesktop.data.datasets[0].data = nextProps.data;
        this.chartDesktop.data.labels = nextProps.labels;
        if (maxValue < 100) {
            this.chartDesktop.options.scales.yAxes[0].ticks.min = 0;
        } else {
            this.chartDesktop.options.scales.yAxes[0].ticks.min = null;
        }
        this.chartDesktop.update();
        this.responsiveUpdateOfChart();
    }

    componentDidMount()
    {
        this.createChart(this.props);
        this.responsiveUpdateOfChart();
    }

    createChart(props)
    {
        var _this = this;
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
                        maxTicksLimit: 7,
                        min: 0,
                        callback: function(label, index, labels) {
                            if (_this.maxIdentifier === 'k') {
                                if (label === 0) { return 0; }
                                return label / 1000 + "K";
                            }
                            if (_this.maxIdentifier === 'm') {
                                if (label === 0) { return 0; }
                                return label / 1000000 + "M";
                            }
                            if (_this.maxIdentifier === 'b') {
                                if (label === 0) { return 0; }
                                return label / 1000000000 + "B";
                            }
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
                        autoSkip: false,
                        callback: (dataLabel, index, dataLabels) => {
                            if (dataLabel === 'now') {
                                return dataLabel;
                            }
                            if (
                                dataLabel.indexOf(':00') !== -1 ||
                                (this.canvasWidth >= 1200 && dataLabel.indexOf(':30') !== -1)
                            ) {
                                if (dataLabels.length - index >= 4) {
                                    return dataLabel;
                                }
                            }

                            return null;
                        }
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

        this.chartDesktop = new Chart(canvas, {
            type: 'line',
            options: options,
            data: data,
        });
    }

    getMaxValueFromData(props)
    {
        let maxValue = 0;
        for (let i=0; i<props.data.length; i++) {
            if (props.data[i] > maxValue) {
                maxValue = props.data[i];
            }
        }
        return maxValue;
    }
}
