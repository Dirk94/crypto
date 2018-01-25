import React from 'react';
import PortfolioBalance from "./utils/PortfolioBalance.jsx";
import PortfolioBalanceData from "../../common/data/PortfolioBalanceData.jsx";
import CoinData from "../../common/data/CoinData.jsx";
import moment from 'moment';
import SingleLineChart from "./utils/charts/SingleLineChart.jsx";

export default class Overview extends React.Component
{
    constructor()
    {
        super();

        this.clickedMinutes = this.clickedMinutes.bind(this);
        this.clickedHours   = this.clickedHours.bind(this);
        this.clickedDays    = this.clickedDays.bind(this);

        this.minuteTooltipTitleCallback = this.minuteTooltipTitleCallback.bind(this);
        this.minuteTickXLabelCallback   = this.minuteTickXLabelCallback.bind(this);
        this.hourTooltipTitleCallback   = this.hourTooltipTitleCallback.bind(this);
        this.hourTickXLabelCallback     = this.hourTickXLabelCallback.bind(this);
        this.dayTooltipTitleCallback    = this.dayTooltipTitleCallback.bind(this);
        this.dayTickXLabelCallback      = this.dayTickXLabelCallback.bind(this);

        this.dataPoints = 50;
        let minuteData = [];
        let hourData = [];
        let dayData = [];
        for (let i=0; i<this.dataPoints; i++) {
            minuteData[i] = 0;
            hourData[i] = 0;
            dayData[i] = 0;
        }
        let minuteLabels = this.generateGraphMinuteLabels();
        let hourLabels = this.generateGraphHourLabels();
        let dayLabels = this.generateGraphDayLabels();

        this.state = {
            amount: -1,
            percentage: 0,

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
        }
    }

    componentDidMount()
    {
        this.getPortfolioData();
        this.getGraphData();

        // Already load the data.
        CoinData.getCoinData();

        setInterval(
            () => {
                this.getPortfolioData()
                this.getGraphData()
            }, 1000 * 10 // every 10 seconds
        );
    }

    render()
    {
        return (
            <div>
                <div className="dashhead">
                    <div className="dashhead-titles">
                        <h6 className="dashhead-subtitle">Trading</h6>
                        <h2 className="dashhead-title">Overview</h2>
                    </div>
                </div>

                <hr className="mt-3" />

                <div className="row text-center mt-5">
                    <div className="col-12">
                        <PortfolioBalance
                            amount={this.state.amount}
                            percentage={this.state.percentage}
                        />
                    </div>
                </div>

                <div className="hr-divider mt-5 mb-3">
                    <h3 className="hr-divider-content hr-divider-heading">Portfolio Balance</h3>
                </div>

                <div className="row">
                    <div className="col-12">
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

                        <SingleLineChart
                            labels={this.state.currentLabels}
                            data={this.state.currentData}
                            tickXLabelCallback={this.state.tickCallback}
                            tooltipTitleCallback={this.state.tooltipCallback}
                            color={"rgba(40, 165, 213, 1)"}
                        />

                    </div>
                </div>

                <hr className="mt-5" />
            </div>
        );
    }

    getGraphData()
    {
        PortfolioBalanceData.getMinuteData()
            .then((data) => {
                let newMinuteData = [];
                for (let i=0; i<this.dataPoints - data.count; i++) {
                    newMinuteData.push(0);
                }

                for (let i=data.count-1; i>=0; i--) {
                    let graphItem = data.data[i];
                    newMinuteData.push(parseFloat(graphItem.usd_value));
                }

                this.setState({
                    minuteData: newMinuteData,
                    minuteLabels: this.generateGraphMinuteLabels()
                });
            })
            .catch((error) => {
                console.log("ERROR");
                console.log(error);
            });

        PortfolioBalanceData.getHourData()
            .then((data) => {
                let newHourData = [];
                for (let i=0; i<this.dataPoints - data.count; i++) {
                    newHourData.push(0);
                }

                for (let i=data.count-1; i>=0; i--) {
                    let graphItem = data.data[i];
                    newHourData.push(parseFloat(graphItem.usd_value));
                }

                this.setState({
                    hourData: newHourData,
                    hourLabels: this.generateGraphHourLabels()
                });
            })
            .catch((error) => {
                console.log("ERROR");
                console.log(error);
            });

        PortfolioBalanceData.getDayData()
            .then((data) => {
                let newDayData = [];
                for (let i=0; i<this.dataPoints - data.count; i++) {
                    newDayData.push(0);
                }

                for (let i=data.count-1; i>=0; i--) {
                    let graphItem = data.data[i];
                    newDayData.push(parseFloat(graphItem.usd_value));
                }

                this.setState({
                    dayData: newDayData,
                    dayLabels: this.generateGraphDayLabels()
                });
            })
            .catch((error) => {
                console.log("ERROR");
                console.log(error);
            });
    }

    generateGraphMinuteLabels()
    {
        let minuteLabels = [];
        for (let i=0; i<this.dataPoints; i++) {
            if (i == this.dataPoints-1) {
                minuteLabels.push('now');
            } else {
                let valueInMinutes = ((this.dataPoints - 1) * 5) - (i * 5);
                let momentDate = moment().subtract(valueInMinutes, 'minutes');
                let minute = Math.floor(parseFloat(momentDate.minute() / 5)) * 5;
                momentDate.minute(minute);

                let label = momentDate.format('H:mm');
                minuteLabels.push(label);
            }
        }

        return minuteLabels;
    }

    generateGraphHourLabels()
    {
        let hourLabels = [];
        for (let i=0; i<this.dataPoints; i++) {
            if (i == this.dataPoints-1) {
                hourLabels.push(moment().format('DD-MM[  ]H:00'));
            } else {
                let valueInHours = (this.dataPoints - 1) - i;
                let momentDate = moment().subtract(valueInHours, 'hours');

                const diffInDays = moment().diff(momentDate, 'days')

                hourLabels.push(momentDate.format('DD-MM[  ]H:00'));
            }
        }

        return hourLabels;
    }

    generateGraphDayLabels()
    {
        let dayLabels = [];
        for (let i=0; i<this.dataPoints; i++) {
            if (i == this.dataPoints-1) {
                dayLabels.push("Today");
            } else if (i == this.dataPoints-2) {
                dayLabels.push("Yesterday");
            } else {
                let valueInDays = (this.dataPoints - 1) - i;
                let momentDate = moment().subtract(valueInDays, 'days');

                let label = momentDate.format('DD MMM')
                dayLabels.push(label);
            }
        }

        return dayLabels;
    }

    minuteTickXLabelCallback(dataLabel, index, dataLabels, canvasWidth) {
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

    minuteTooltipTitleCallback(tooltipItem, data) {
        let index = tooltipItem[0].index;
        let labelValue = data.labels[index];
        if (labelValue === "now") {
            return "Now";
        }
        return "Today at " + labelValue;
    }

    hourTickXLabelCallback(dataLabel, index, dataLabels, canvasWidth) {
        if (canvasWidth < 1200) {
            if (index % 16 === 0) {
                let momentDate = moment(dataLabel, 'DD-MM[  ]H:00');
                return momentDate.format('DD-MM');
            }
        } else {
            if (index % 7 === 0) {
                return dataLabel;
            }
        }

        return null;
    }

    hourTooltipTitleCallback(tooltipItem, data) {
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

    dayTickXLabelCallback(dataLabel, index, dataLabels, canvasWidth) {
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

    dayTooltipTitleCallback(tooltipItem, data) {
        let index = tooltipItem[0].index;
        let labelValue = data.labels[index];
        return labelValue;
    }

    getPortfolioData()
    {
        PortfolioBalanceData.getBalance()
            .then((response) => {
                let portfolio = response[0];

                let valueNow = parseFloat(portfolio.usd_value);
                let value24HAgo = parseFloat(portfolio.usd_value_1d_ago);

                let percentage = (valueNow - value24HAgo) / value24HAgo * 100;
                if (value24HAgo === 0) {
                    percentage = 0;
                }

                this.setState({
                    portfolioId: portfolio.id,
                    amount: parseFloat(portfolio.usd_value),
                    percentage: percentage
                })
            })
            .catch((error) => {
                console.log("ERROR");
                console.log(error);
            });
    }

    clickedMinutes()
    {
        console.log("Clicked Minutes");
        this.setState({
            selectedLabel: 'minutes',
            tooltipCallback: this.minuteTooltipTitleCallback,
            tickCallback: this.minuteTickXLabelCallback,
            currentData: this.state.minuteData,
            currentLabels: this.state.minuteLabels,
        });
    }

    clickedHours()
    {
        console.log("Clicked Hours");
        this.setState({
            selectedLabel: 'hours',
            tooltipCallback: this.hourTooltipTitleCallback,
            tickCallback: this.hourTickXLabelCallback,
            currentData: this.state.hourData,
            currentLabels: this.state.hourLabels,
        });
    }

    clickedDays()
    {
        console.log("Clicked Days");
        this.setState({
            selectedLabel: 'days',
            tooltipCallback: this.dayTooltipTitleCallback,
            tickCallback: this.dayTickXLabelCallback,
            currentData: this.state.dayData,
            currentLabels: this.state.dayLabels,
        });
    }
}
