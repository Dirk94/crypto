import React from 'react';
import PortfolioBalance from "../utils/PortfolioBalance.jsx";

export default class Overview extends React.Component
{
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
                        <PortfolioBalance />
                    </div>
                </div>

                <div className="hr-divider mt-5 mb-3">
                    <h3 className="hr-divider-content hr-divider-heading">Portfolio Balance</h3>
                </div>

                <div className="row">
                    <div className="col-12">

                    </div>
                </div>

                <hr className="mt-5" />
            </div>
        );
    }
}
