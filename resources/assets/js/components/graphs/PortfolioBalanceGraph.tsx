import * as React from 'react';
import * as PropTypes from 'prop-types';
import SingleLineChart from "./basic/SingleLineChart";

export default class PortfolioBalanceGraph extends React.Component<any, any>
{
    static propTypes = {
        labels: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        color: PropTypes.string,
        tickXLabelCallback: PropTypes.func.isRequired,
        tooltipTitleCallback: PropTypes.func.isRequired,
    }

    constructor(props: any)
    {
        super(props);
    }

    public render()
    {
        return (
            <SingleLineChart
                labels={this.props.labels}
                data={this.props.data}
                color={this.props.color}
                tickXLabelCallback={this.props.tickXLabelCallback}
                tooltipTitleCallback={this.props.tooltipTitleCallback}
            />
        )
    }
}
