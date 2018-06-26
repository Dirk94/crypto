import * as React from 'react';
import Request from '../../common/Request';
import Session from '../../common/Session';
import TradesTable from '../../components/TradesTable';
import AddDepositModal from '../../components/modals/AddDepositModal';

export default class TradesPage extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            transactions: []
        }
    }

    componentDidMount()
    {
        Request.get('/api/portfolios/' + Session.get('portfolio_id') + '/transactions')
            .then((response: any) => {
                const data = response.data;
                this.setState({
                    transactions: data
                });
            })
            .catch((error: any) => {
                console.log("Error while getting transaction data!");
                console.log(error);
            })
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
                <div style={{clear: 'both'}} />

                <TradesTable
                    transactions={this.state.transactions}
                />
            </div>
        )
    }
}
