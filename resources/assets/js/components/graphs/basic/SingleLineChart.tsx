import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import String from '../../../common/String';

export default class SingleLineChart extends React.Component<any, any>
{
    static propTypes = {
        labels: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        color: PropTypes.string,
        tickXLabelCallback: PropTypes.func.isRequired,
        tooltipTitleCallback: PropTypes.func.isRequired,
    }

    maxIdentifier: string;

    constructor(props: any)
    {
        super(props);

        let maxValue = this.getMaxValueFromData(props);
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

        const options = this.getOptionsFromProps(props);
        const data = this.getDataFromProps(props);

        this.state = {
            data: data,
            options: options,
        };
    }

    public render()
    {
        return (
            <Line
                data={this.state.data}
                options={this.state.options}
            />
        );
    }

    componentWillReceiveProps(nextProps: any)
    {
        let minValue = this.getMinValueFromData(nextProps);
        let maxValue = this.getMaxValueFromData(nextProps);
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

        const options = this.getOptionsFromProps(nextProps);
        const data = this.getDataFromProps(nextProps);

        this.setState({
            options: options,
            data: data
        });
    }

    getMaxValueFromData(props: any)
    {
        let maxValue = 0;
        for (let i=0; i<props.data.length; i++) {
            if (props.data[i] > maxValue) {
                maxValue = props.data[i];
            }
        }
        return maxValue;
    }

    getMinValueFromData(props: any)
    {
        let minValue = Infinity;
        for (let i=0; i<props.data.length; i++) {
            if (props.data[i] < minValue) {
                minValue = props.data[i];
            }
        }
        return minValue;
    }

    getOptionsFromProps(props: any)
    {
        return {
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
                        suggestedMax: 100,
                        callback: (label: any, index: any, labels: any) => {
                            if (this.maxIdentifier === 'kd') {
                                if (label === 0) { return 0; }
                                return (label / 1000) + "K";
                            }
                            if (this.maxIdentifier === 'k') {
                                if (label === 0) { return 0; }
                                return (label / 1000) + "K";
                            }
                            if (this.maxIdentifier === 'm') {
                                if (label === 0) { return 0; }
                                return (label / 1000000) + "M";
                            }
                            if (this.maxIdentifier === 'b') {
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
                        autoSkip: true,
                        maxTicksLimit: 10,
                        //callback: (dataLabel, index, dataLabels) => {
                        //    return this.props.tickXLabelCallback(dataLabel, index, dataLabels, 1400);
                        //}
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
                    title: (tooltipItem: any, data: any) => {
                        return props.tooltipTitleCallback(tooltipItem, data);
                    },
                    label: function(tooltipItem: any, data: any) {
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
    }

    getDataFromProps(props: any)
    {
        return {
            labels: props.labels,
            datasets: [{
                label: '',
                data: props.data,
                fill: true,

                borderWidth: 2,
                lineTension: 0,

                pointRadius: 0,
                pointHitRadius: 1000,

                borderColor: props.color,
                backgroundColor: 'rgba(0,0,0,0.1)',
                pointBorderColor: props.color,
                pointBackgroundColor: props.color,
                pointHoverBackgroundColor: props.color,
                pointHoverBorderColor: props.color,
            }],
        };
    }
}
