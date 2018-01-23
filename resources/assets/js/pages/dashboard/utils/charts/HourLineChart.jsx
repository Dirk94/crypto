import React from 'react';
import PropTypes from 'prop-types';
import SingleLineChart from "./SingleLineChart.jsx";
import moment from 'moment';

export default class HourLineChart extends React.Component
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
            if (index % 16 === 0) {
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

        let momentDate = moment(labelValue, 'DD-MM[  ]H:00');
        const diffInDays = moment().diff(momentDate, 'days')
        if (diffInDays === 0) {
            return momentDate.format('[Today  ]H:00');
        }
        if (diffInDays === 1) {
            return momentDate.format('[Yesterday  ]H:00');
        }
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
