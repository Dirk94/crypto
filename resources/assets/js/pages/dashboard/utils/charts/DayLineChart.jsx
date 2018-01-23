import React from 'react';
import PropTypes from 'prop-types';
import SingleLineChart from "./SingleLineChart.jsx";
import moment from 'moment';

export default class DayLineChart extends React.Component
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
        if (canvasWidth < 1200) {
            if (index % 10 === 0) {
                return dataLabel;
            }
        } else {
            if (index % 7 === 0) {
                return dataLabel;
            }
        }

        return null;
    }

    tooltipTitleCallback(tooltipItem, data) {
        let index = tooltipItem[0].index;
        let labelValue = data.labels[index];
        return labelValue;
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
