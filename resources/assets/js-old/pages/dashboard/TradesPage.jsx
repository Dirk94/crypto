import React from 'react';
import AddTradeModal from "./partials/AddTradeModal.jsx";
import AddDepositModal from "./partials/AddDepositModal.jsx";
import TradesTable from "./partials/TradesTable.jsx";
import PortfolioBalanceData from "../../common/data/PortfolioBalanceData.jsx";

export default class Trades extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            transactions: []
        }
    }

    componentDidMount()
    {
        PortfolioBalanceData.getTransactionData()
            .then((response) => {
                this.setState({
                    transactions: response
                });
            })
            .catch((error) => {
                console.log("Error while getting transaction data!");
                console.log(error);
            });
    }

    render()
    {
        return (
            <div>
                <div className="dashhead">
                    <div className="dashhead-titles">
                        <h6 className="dashhead-subtitle">Trading</h6>
                        <h2 className="dashhead-title">Your Trades</h2>
                    </div>
                </div>

                <hr className="mt-3" />

                <AddDepositModal />
                <AddTradeModal />
                <div style={{clear: 'both'}} />

                <TradesTable
                    transactions={this.state.transactions}
                />
            </div>
        );
    }
}
