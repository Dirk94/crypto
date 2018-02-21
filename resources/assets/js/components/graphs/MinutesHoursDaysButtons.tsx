import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class MinutesHoursDaysButtons extends React.Component<any, any>
{
    static propTypes = {
        onClickedButton: PropTypes.func.isRequired,
    }

    constructor(props: any)
    {
        super(props);

        this.state = {
            selectedLabel: 'minutes'
        }

        this.clickedMinutes = this.clickedMinutes.bind(this);
        this.clickedHours = this.clickedHours.bind(this);
        this.clickedDays = this.clickedDays.bind(this);
    }

    public clickedMinutes()
    {
        this.setState({selectedLabel: 'minutes'});
        this.props.onClickedButton('minutes');
    }

    public clickedHours()
    {
        this.setState({selectedLabel: 'hours'});
        this.props.onClickedButton('hours');
    }

    public clickedDays()
    {
        this.setState({selectedLabel: 'days'});
        this.props.onClickedButton('days');
    }

    public render()
    {
        return (
            <div className="chart-selector-container">
                <div className="chart-selector btn-group dashhead-toolbar-item btn-group-thirds">
                    <button
                        type="button"
                        className={'btn btn-outline-primary no-box-shadow ' + (this.state.selectedLabel === 'minutes' ? 'active' : '')}
                        onClick={this.clickedMinutes}
                    >
                        Minutes
                    </button>

                    <button
                        type="button"
                        className={'btn btn-outline-primary no-box-shadow ' + (this.state.selectedLabel === 'hours' ? 'active' : '')}
                        onClick={this.clickedHours}
                    >
                        Hours
                    </button>

                    <button
                        type="button"
                        className={'btn btn-outline-primary no-box-shadow ' + (this.state.selectedLabel === 'days' ? 'active' : '')}
                        onClick={this.clickedDays}
                    >
                        Days
                    </button>
                </div>
            </div>
        )
    }
}