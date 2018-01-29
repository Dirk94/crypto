import React from 'react';

export default class TradesTable extends React.Component
{
    render()
    {
        return (
            <table className="table trades-table" data-sort="table">
                <thead>
                <tr>
                    <th className="header">Date</th>
                    <th className="header">Buy Coin</th>
                    <th className="header">Buy Amount</th>
                    <th className="header">Sell Coin</th>
                    <th className="header">Sell Amount</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Today 11:23</td>
                    <td>Request (REQ)</td>
                    <td>
                        50
                    </td>
                    <td></td>
                    <td></td>
                </tr></tbody>
            </table>
        )
    }
}
