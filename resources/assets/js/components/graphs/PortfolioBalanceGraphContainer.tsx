import * as React from 'react';
import MinutesHoursDaysButtons from './MinutesHoursDaysButtons';

export default class PortfolioBalanceGraphContainer extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);

        this.state = {

        };

        this.onClickedButton = this.onClickedButton.bind(this);
    }

    public onClickedButton(label: string)
    {
        console.log("Clicked button: " + label);
    }

    public render()
    {
        return (
            <MinutesHoursDaysButtons
                onClickedButton={this.onClickedButton}
            />
        )
    }
}
