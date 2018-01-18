import React from 'react';
import AddTradeModal from "./partials/AddTradeModal.jsx";
import AddDepositModal from "./partials/AddDepositModal.jsx";

export default class Trades extends React.Component
{
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


            </div>
        );
    }
}
