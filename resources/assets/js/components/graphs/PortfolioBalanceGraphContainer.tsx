import * as React from 'react';
import * as moment from 'moment';
import MinutesHoursDaysButtons from './MinutesHoursDaysButtons';
import PortfolioBalanceGraph from "./PortfolioBalanceGraph";
import Request from "../../common/Request";
import Session from "../../common/Session";

export default class PortfolioBalanceGraphContainer extends React.Component<any, any>
{
    maxDataPoints: number = 50;

    constructor(props: any)
    {
        super(props);

        let minuteData: number[] = [];
        let hourData: number[] = [];
        let dayData: number[] = [];
        for (let i=0; i<this.maxDataPoints; i++) {
            minuteData[i] = 0;
            hourData[i] = 0;
            dayData[i] = 0;
        }
        let minuteLabels = this.generateGraphMinuteLabels(50);
        let hourLabels = this.generateGraphHourLabels(50);
        let dayLabels = this.generateGraphDayLabels(50);

        this.state = {
            minuteData: minuteData,
            minuteLabels: minuteLabels,
            hourData: hourData,
            hourLabels: hourLabels,
            dayData: dayData,
            dayLabels: dayLabels,

            currentData: minuteData,
            currentLabels: minuteLabels,

            tickCallback: this.minuteTickXLabelCallback,
            tooltipCallback: this.minuteTooltipTitleCallback,

            selectedLabel: 'minutes',
        };

        this.onClickedButton = this.onClickedButton.bind(this);

        this.minuteTooltipTitleCallback = this.minuteTooltipTitleCallback.bind(this);
        this.minuteTickXLabelCallback   = this.minuteTickXLabelCallback.bind(this);
        this.hourTooltipTitleCallback   = this.hourTooltipTitleCallback.bind(this);
        this.hourTickXLabelCallback     = this.hourTickXLabelCallback.bind(this);
        this.dayTooltipTitleCallback    = this.dayTooltipTitleCallback.bind(this);
        this.dayTickXLabelCallback      = this.dayTickXLabelCallback.bind(this);
    }

    public componentDidMount()
    {
        this.getGraphData();

        setInterval(() => { this.getGraphData(); }, 1000 * 10);
    }

    public onClickedButton(label: string)
    {
        this.setState({selectedLabel: label});

        switch(label) {
            case 'minutes':
                this.setState({
                    tooltipCallback: this.minuteTooltipTitleCallback,
                    tickCallback: this.minuteTickXLabelCallback,
                    currentData: this.state.minuteData,
                    currentLabels: this.state.minuteLabels,
                });
                break;

            case 'hours':
                this.setState({
                    tooltipCallback: this.hourTooltipTitleCallback,
                    tickCallback: this.hourTickXLabelCallback,
                    currentData: this.state.hourData,
                    currentLabels: this.state.hourLabels,
                });
                break;

            case 'days':
                this.setState({
                    tooltipCallback: this.dayTooltipTitleCallback,
                    tickCallback: this.dayTickXLabelCallback,
                    currentData: this.state.dayData,
                    currentLabels: this.state.dayLabels,
                });
                break;
        }
    }

    public render()
    {
        return (
            <div>
                <MinutesHoursDaysButtons
                    onClickedButton={this.onClickedButton}
                />

                <PortfolioBalanceGraph
                    labels={this.state.currentLabels}
                    data={this.state.currentData}
                    tickXLabelCallback={this.state.tickCallback}
                    tooltipTitleCallback={this.state.tooltipCallback}
                    color={"rgba(40, 165, 213, 1)"}
                />
            </div>
        )
    }

    private getGraphData()
    {
        const portfolioId: any = Session.get('portfolio_id');

        Request.get('/api/portfolios/' + portfolioId + '/history/minutes')
            .then((response: any) => {
                const data = response.data;
                let newMinuteData = [];
                if (data.count < 10) {
                    for (let i = 0; i < 10 - data.count; i++) {
                        newMinuteData.push(0);
                    }
                }

                for (let i=data.count-1; i>=0; i--) {
                    let graphItem = data.data[i];
                    newMinuteData.push(parseFloat(graphItem.usd_value));
                }

                const newLabels = this.generateGraphMinuteLabels(newMinuteData.length);

                this.setState({
                    minuteData: newMinuteData,
                    minuteLabels: newLabels
                });

                if (this.state.selectedLabel == 'minutes') {
                    this.setState({
                        currentData: this.state.minuteData,
                        currentLabels: this.state.minuteLabels,
                    });
                }
            })
            .catch((error) => {
                console.log("Error");
                console.log(error);
            });

        Request.get('/api/portfolios/' + portfolioId + '/history/hours')
            .then((response: any) => {
                const data = response.data;
                let newHourData = [];
                if (data.count < 5) {
                    for (let i = 0; i < 5 - data.count; i++) {
                        newHourData.push(0);
                    }
                }

                for (let i=data.count-1; i>=0; i--) {
                    let graphItem = data.data[i];
                    newHourData.push(parseFloat(graphItem.usd_value));
                }

                newHourData.push(this.state.amount);

                const newLabels = this.generateGraphHourLabels(newHourData.length);

                this.setState({
                    hourData: newHourData,
                    hourLabels: newLabels
                });

                if (this.state.selectedLabel == 'hours') {
                    this.setState({
                        currentData: this.state.hourData,
                        currentLabels: this.state.hourLabels,
                    });
                }
            })
            .catch((error) => {
                console.log("Error");
                console.log(error);
            });

        Request.get('/api/portfolios/' + portfolioId + '/history/days')
            .then((response: any) => {
                const data = response.data;
                let newDayData = [];
                if (data.count < 3) {
                    for (let i = 0; i < 3 - data.count; i++) {
                        newDayData.push(0);
                    }
                }

                for (let i=data.count-1; i>=0; i--) {
                    let graphItem = data.data[i];
                    newDayData.push(parseFloat(graphItem.usd_value));
                }

                newDayData.push(this.state.amount);

                const newLabels = this.generateGraphDayLabels(newDayData.length);

                this.setState({
                    dayData: newDayData,
                    dayLabels: newLabels,
                });

                if (this.state.selectedLabel == 'days') {
                    this.setState({
                        currentData: this.state.dayData,
                        currentLabels: this.state.dayLabels,
                    });
                }
            })
            .catch((error) => {
                console.log("Error");
                console.log(error);
            });
    }

    private generateGraphMinuteLabels(amount: number)
    {
        let minuteLabels: string[] = [];
        for (let i=0; i<amount; i++) {
            if (i == amount-1) {
                minuteLabels.push('now');
            } else {
                let valueInMinutes = ((amount - 1) * 5) - (i * 5);
                let momentDate = moment().subtract(valueInMinutes, 'minutes');
                let minute = Math.floor(momentDate.minute() / 5) * 5;
                momentDate.minute(minute);

                let label = momentDate.format('H:mm');
                minuteLabels.push(label);
            }
        }

        return minuteLabels;
    }

    private generateGraphHourLabels(amount: number)
    {
        let hourLabels: string[] = [];
        for (let i=0; i<amount; i++) {
            if (i == amount-1) {
                hourLabels.push('Now');
            } else {
                let valueInHours = (amount - 2) - i;
                let momentDate = moment().subtract(valueInHours, 'hours');

                hourLabels.push(momentDate.format('DD-MM[  ]H:00'));
            }
        }

        return hourLabels;
    }

    private generateGraphDayLabels(amount: number)
    {
        let dayLabels: string[] = [];
        for (let i=0; i<amount; i++) {
            if (i == amount-1) {
                dayLabels.push("Today");
            } else if (i == amount-2) {
                dayLabels.push("Yesterday");
            } else {
                let valueInDays = (amount - 1) - i;
                let momentDate = moment().subtract(valueInDays, 'days');

                let label = momentDate.format('DD MMM')
                dayLabels.push(label);
            }
        }

        return dayLabels;
    }

    private minuteTickXLabelCallback(dataLabel: any, index: any, dataLabels: any, canvasWidth: any)
    {
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

    private minuteTooltipTitleCallback(tooltipItem: any, data: any)
    {
        let index = tooltipItem[0].index;
        let labelValue = data.labels[index];
        if (labelValue === "now") {
            return "Now";
        }
        return "Today at " + labelValue;
    }

    private hourTickXLabelCallback(dataLabel: any, index: any, dataLabels: any, canvasWidth: any)
    {
        if (canvasWidth < 1200) {
            if (index % 16 === 0) {
                let momentDate = moment(dataLabel, 'DD-MM[  ]H:00');
                return momentDate.format('DD-MM');
            }
        } else {
            if (index % 12 === 0) {
                return dataLabel;
            }
        }

        return null;
    }

    private hourTooltipTitleCallback(tooltipItem: any, data: any)
    {
        let index = tooltipItem[0].index;
        let labelValue = data.labels[index];

        var reference = moment();
        var TODAY = reference.clone().startOf('day');
        var YESTERDAY = reference.clone().subtract(1, 'days').startOf('day');

        let momentDate = moment(labelValue, 'DD-MM[  ]H:00');
        if (TODAY.isSame(momentDate, 'd')) {
            return momentDate.format('[Today  ]H:00');
        }
        if (YESTERDAY.isSame(momentDate, 'd')) {
            return momentDate.format('[Yesterday  ]H:00');
        }
        return labelValue;
    }

    private dayTickXLabelCallback(dataLabel: any, index: any, dataLabels: any, canvasWidth: any)
    {
        let num = 7;
        if (dataLabels.length < 10) { num = 2; }
        if (dataLabel === 'Today') {
            return dataLabel;
        }
        if (index % num === 0) {
            return dataLabel;
        }

        return null;
    }

    private dayTooltipTitleCallback(tooltipItem: any, data: any)
    {
        let index = tooltipItem[0].index;
        let labelValue = data.labels[index];
        return labelValue;
    }
}
