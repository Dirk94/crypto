import * as React from 'react';
import Request from "../common/Request";
import PortfolioBalance from "./PortfolioBalance";

export default class PortfolioBalanceContainer extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            amount: -1,
            percentage1h: 0,
            percentage24h: 0,
            percentage7d: 0,
        }
    }

    public componentDidMount()
    {
        this.getPortfolioBalanceData();

        setInterval(() => { this.getPortfolioBalanceData(); }, 1000 * 10);
    }

    private getPortfolioBalanceData()
    {
        Request.get('/api/portfolios')
            .then((response: any) => {
                this.setState({amount: parseFloat(response.data[0].usd_value)});
                this.setPercentageChange(response.data[0]);
            });
    }

    private setPercentageChange(data: any)
    {
        const valueNow    = parseFloat(data.usd_value);
        const value1hAgo  = parseFloat(data.usd_value_1h_ago);
        const value24hAgo = parseFloat(data.usd_value_1d_ago);
        const value7dAgo  = parseFloat(data.usd_value_7d_ago);

        let percentage1h  = (valueNow - value1hAgo) / value1hAgo * 100;
        let percentage24h = (valueNow - value24hAgo) / value24hAgo * 100;
        let percentage7d  = (valueNow - value7dAgo) / value7dAgo * 100;

        if (value1hAgo  === 0) { percentage1h = 0; }
        if (value24hAgo === 0) { percentage24h = 0; }
        if (value7dAgo  === 0) { percentage7d = 0; }

        this.setState({percentage1h, percentage24h, percentage7d});
    }

    public render()
    {
        return (
            <PortfolioBalance
                amount={this.state.amount}
                percentage1h={this.state.percentage1h}
                percentage24h={this.state.percentage24h}
                percentage7d={this.state.percentage7d}
            />
        )
    }
}
