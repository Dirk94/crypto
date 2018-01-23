import React from 'react';
import PropTypes from 'prop-types';
import SingleLineChart from "./SingleLineChart.jsx";

export default class MinuteLineChart extends React.Component
{
    static propTypes = {
        hidden: PropTypes.bool.isRequired,
        labels: PropTypes.array.isRequired,
        data:   PropTypes.array.isRequired,
        color:  PropTypes.string
    }

    constructor(props) {
        super(props);

        this.tickXLabelCallback = this.tickXLabelCallback.bind(this);
        this.tooltipTitleCallback = this.tooltipTitleCallback.bind(this);
    }

    tickXLabelCallback(dataLabel, index, dataLabels, canvasWidth) {
        if (dataLabel === 'now') {
            return dataLabel;
        }

        const isWholeHour = dataLabel.indexOf(':00') !== -1;
        const isHalfHour = (canvasWidth >= 1200 && dataLabel.indexOf(':30') !== -1)
        const isEnoughToTheLeft = dataLabels.length - index >= 4;

        if ((isWholeHour || isHalfHour) && isEnoughToTheLeft) {
            return dataLabel;
        }

        return null;
    }

    tooltipTitleCallback(tooltipItem, data) {
        let index = tooltipItem[0].index;
        let labelValue = data.labels[index];
        if (labelValue === "now") {
            return "Now";
        }
        return "Today at " + labelValue;
    }

    render() {
        return (
            <SingleLineChart
                hidden={this.props.hidden}
                labels={this.props.labels}
                data={this.props.data}
                color={this.props.color}
                tickXLabelCallback={this.tickXLabelCallback}
                tooltipTitleCallback={this.tooltipTitleCallback}
            />
        );
    }
}
