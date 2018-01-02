import React from 'react';

export default class PortfolioBalance extends React.Component {
    render() {
        return (
            <div className="statcard p-3">
                <h3 className="statcard-number">
                    $12,938
                    <small className="delta-indicator delta-positive">
                        5%
                    </small>
                </h3>
                <span className="statcard-desc">Portfolio Value</span>
            </div>
        );
    }
}
