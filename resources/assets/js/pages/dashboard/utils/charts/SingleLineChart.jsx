import React from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import String from "../../../../common/String.jsx";

export default class SingleLineChart extends React.Component
{
    static propTypes = {
        hidden: PropTypes.bool.isRequired,
        labels: PropTypes.array.isRequired,
        data:   PropTypes.array.isRequired,
        color:  PropTypes.string,
        tickXLabelCallback: PropTypes.func.isRequired,
        tooltipTitleCallback: PropTypes.func.isRequired,
    }

    constructor()
    {
        super();

        this.id = "id-" + Math.random().toString(36).substring(7);

        var resizeId;
        $(window).resize(() => {
            clearTimeout(resizeId);
            resizeId = setTimeout(() => {
                const canvas = document.getElementById(this.id);
                if (canvas) {
                    this.canvasWidth = canvas.width;
                }

                this.responsiveUpdateOfChart();
            }, 100);
        });
    }

    responsiveUpdateOfChart()
    {
        this.canvasWidth = document.getElementById(this.id).width;

        if (this.canvasWidth < 1200) {
            this.chartDesktop.options.scales.yAxes[0].ticks.maxTicksLimit = 2;
            this.chartDesktop.options.scales.yAxes[0].ticks.padding = 4;
            this.chartDesktop.options.scales.xAxes[0].ticks.padding = 0;
            this.chartDesktop.data.datasets[0].pointRadius = 0;
            this.chartDesktop.update();
        } else {
            this.chartDesktop.options.scales.yAxes[0].ticks.maxTicksLimit = 7;
            this.chartDesktop.options.scales.yAxes[0].ticks.padding = 12;
            this.chartDesktop.options.scales.xAxes[0].ticks.padding = 12;
            this.chartDesktop.data.datasets[0].pointRadius = 2;
            this.chartDesktop.update();
        }
    }

    render()
    {
        return (
            <div>
                <canvas id={this.id} style={this.props.hidden ? {display: 'none'} : {display: 'block'}}/>
            </div>
        );
    }

    componentWillReceiveProps(nextProps)
    {
        let maxValue = this.getMaxValueFromData(nextProps);
        let minValue = this.getMinValueFromData(nextProps);
        this.maxIdentifier = '';
        if (maxValue >= 1000 && maxValue < 100000) {
            this.maxIdentifier = 'kd';
        } else if (maxValue >= 100000 && maxValue < 1000000) {
            this.maxIdentifier = 'k';
        } else if (maxValue >= 1000000 && maxValue <= 1000000000) {
            this.maxIdentifier = 'm';
        } else if (maxValue >= 1000000000) {
            this.maxIdentifier = 'b';
        }

        this.chartDesktop.data.datasets[0].data = nextProps.data;
        this.chartDesktop.data.labels = nextProps.labels;

        this.setYAxisMinAndMaxValues(nextProps);

        this.chartDesktop.update();
        this.responsiveUpdateOfChart();
    }

    setYAxisMinAndMaxValues(props)
    {
        const min = this.getMinValueFromData(props);
        const max = this.getMaxValueFromData(props);

        let suggestedMin, suggestedMax;
        if (this.canvasWidth < 1200) {
            suggestedMin = min;
            suggestedMax = max;
        } else {
            suggestedMin = min + (min * 0.02);
            suggestedMax = max - (max * 0.02);
        }

        this.chartDesktop.options.scales.yAxes[0].ticks.suggestedMin = suggestedMin;
        this.chartDesktop.options.scales.yAxes[0].ticks.suggestedMin = suggestedMax;
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
                        suggestedMin: 0,
                        suggestedMax: 100,
                        callback: function(label, index, labels) {
                            if (_this.maxIdentifier === 'kd') {
                                if (label === 0) { return 0; }
                                return (label / 1000) + "K";
                            }
                            if (_this.maxIdentifier === 'k') {
                                if (label === 0) { return 0; }
                                return (label / 1000) + "K";
                            }
                            if (_this.maxIdentifier === 'm') {
                                if (label === 0) { return 0; }
                                return (label / 1000000) + "M";
                            }
                            if (_this.maxIdentifier === 'b') {
                                if (label === 0) { return 0; }
                                return (label / 1000000000) + "B";
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
                            return this.props.tickXLabelCallback(dataLabel, index, dataLabels, this.canvasWidth);
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
                    title: (tooltipItem, data) => {
                        return this.props.tooltipTitleCallback(tooltipItem, data);
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
                label: '',
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

    getMinValueFromData(props)
    {
        let minValue = Infinity;
        for (let i=0; i<props.data.length; i++) {
            if (props.data[i] < minValue) {
                minValue = props.data[i];
            }
        }
        return minValue;
    }
}
