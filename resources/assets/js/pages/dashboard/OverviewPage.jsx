import React from 'react';
import PortfolioBalance from "./utils/PortfolioBalance.jsx";
import SingleLineChart from "./utils/charts/SingleLineChart.jsx";
import axios from 'axios';
import Auth from "../../common/auth/Auth.jsx";

export default class Overview extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            amount: -1,
            percentage: 0,
            portfolioId: -1,

            minuteData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            minuteLabels: [
                '60m ago',
                '55m ago',
                '50m ago',
                '45m ago',
                '40m ago',
                '35m ago',
                '30m ago',
                '25m ago',
                '20m ago',
                '15m ago',
                '10m ago',
                '5m ago',
            ]
        }
    }

    componentDidMount()
    {
        this.getPortfolioData();

        this.timer = setInterval(
            () => this.getPortfolioData(),
            1000 * 60 * 5 // every 5 minutes
        )

        this.timer = setInterval(
            () => this.getGraphData(),
            1000 * 60 * 5 // every 5 minutes
        )
    }

    getGraphData()
    {
        axios.get('/api/portfolios/' + this.state.portfolioId + '/history/minutes', { headers: {
            'Authorization': Auth.getToken()
        }})
            .then((response) => {
                let data = response.data;

                let newMinuteData = [];
                for (let i=0; i<data.count; i++) {
                    let graphItem = data.data[i];
                    newMinuteData.push(parseFloat(graphItem.usd_value));
                }

                this.setState({
                    minuteData: newMinuteData
                });

            })
            .catch((error) => {
                console.log("ERROR");
                console.log(error);
            })
            .finally(() => {

            });
    }

    getPortfolioData()
    {
        axios.get('/api/portfolios', { headers: {
            'Authorization': Auth.getToken()
        }})
            .then((response) => {
                let portfolio = response.data[0];

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

                this.getGraphData();
            })
            .catch((response) => {
                console.log("ERROR");
                console.log(response);
            })
            .finally(() => {

            });
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
}
