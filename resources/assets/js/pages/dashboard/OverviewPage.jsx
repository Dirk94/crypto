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

        this.dataPoints = 50;
        let minuteData = [];
        let minuteLabels = [];
        for (let i=0; i<this.dataPoints; i++) {
            minuteData.push(0);
            minuteLabels.push(((50 * 5) - i*5) + 'm ago');
        }

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

        this.timer = setInterval(
            () => this.getPortfolioData(),
            3000 * 60 * 5 // every 5 minutes
        )

        this.timer = setInterval(
            () => this.getGraphData(),
            1000 * 60 * 5 // every 5 minutes
        )
    }

    getGraphData()
    {
        axios.get('/api/portfolios/' + localStorage.getItem('defaultPortfolioId') + '/history/minutes', { headers: {
            'Authorization': Auth.getToken()
        }})
            .then((response) => {
                let data = response.data;

                let newMinuteData = [];

                for (let i=0; i<this.dataPoints - data.count; i++) {
                    newMinuteData.push(0);
                }

                for (let i=data.count-1; i>=0; i--) {
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
