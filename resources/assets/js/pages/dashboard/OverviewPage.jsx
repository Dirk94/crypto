import React from 'react';
import PortfolioBalance from "./utils/PortfolioBalance.jsx";
import PortfolioBalanceData from "../../common/data/PortfolioBalanceData.jsx";
import SingleLineChart from "./utils/charts/SingleLineChart.jsx";
import CoinData from "../../common/data/CoinData.jsx";
import moment from 'moment';

export default class Overview extends React.Component
{
    constructor()
    {
        super();

        this.dataPoints = 50;
        let minuteData = [];
        for (let i=0; i<this.dataPoints; i++) {
            minuteData[i] = 0;
        }
        let minuteLabels = this.generateGraphLabels();

        this.state = {
            amount: -1,
            percentage: 0,

            minuteData: minuteData,
            minuteLabels: minuteLabels
        }
    }

    componentDidMount()
    {
        this.getPortfolioData();
        this.getGraphData();

        // Already load the data.
        CoinData.getCoinData();

        setInterval(
            () => this.getPortfolioData(),
            1000 * 10 // every 5 minutes
        )

        setInterval(
            () => this.getGraphData(),
            1000 * 10 // every 5 minutes
        )
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
                        <SingleLineChart
                            labels={this.state.minuteLabels}
                            datasetLabel="Portfolio Value"
                            data={this.state.minuteData}
                            color="rgba(40, 165, 213, 1)"
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
                    minuteLabels: this.generateGraphLabels()
                });
            })
            .catch((error) => {
                console.log("ERROR");
                console.log(error);
            });
    }

    generateGraphLabels()
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

                let label = moment().to(momentDate);
                label = momentDate.format('H:mm');
                minuteLabels.push(label);
            }
        }
        return minuteLabels;
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
}
