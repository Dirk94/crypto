import React from 'react';
import AddDepositForm from "../forms/AddDepositForm.jsx";
import Request from "../../../common/Request.jsx";
import PortfolioBalanceData from "../../../common/data/PortfolioBalanceData.jsx";

export default class AddDepositModal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            errors: {},
            success: false,
            loading: false,
            formData: {
                transaction_type: '',
                in_coin_name: '',
                in_amount: '',
            }
        }

        this.processForm = this.processForm.bind(this);
        this.changeFormData = this.changeFormData.bind(this);
        this.clickedAddAnotherTrade = this.clickedAddAnotherTrade.bind(this);
    }

    processForm(event)
    {
        this.setState({ loading: true });

        event.preventDefault();

        Request.post('/api/portfolios/' + localStorage.getItem('defaultPortfolioId') + '/deposit', this.state.formData)
            .then((response) => {
                // Force a data reload from server since we just updated the data.
                PortfolioBalanceData.flushCache();

                this.setState({
                    success: true
                });

                this.setState({loading: false});
            })
            .catch((error) => {
                let data = error.response.data;
                console.log(data.errors);
                this.setState({
                    errors: data.errors
                });

                this.setState({loading: false});
            });

    }

    changeFormData(event)
    {
        const field = event.target.name;
        const formData = this.state.formData;
        formData[field] = event.target.value;

        this.setState({
            formData
        });
    }

    clickedAddAnotherTrade(event)
    {
        event.preventDefault();

        this.setState({
            errors: {},
            success: false,
            loading: false,
            formData: {
                transaction_type: '',
                in_coin_name: '',
                in_amount: '',
            }
        });
    }

    render()
    {
        return (
            <div>
                <button type="button" className="btn btn-outline-primary btn-float" data-toggle="modal" data-target="#addDepositModal">
                    <span className="icon icon-align-bottom"></span>&nbsp;
                    Add Deposit
                </button>

                <div className="modal fade" id="addDepositModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><span className="icon icon-align-bottom"></span>&nbsp;Add Deposit</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddDepositForm
                                    onSubmit={this.processForm}
                                    onChange={this.changeFormData}
                                    errors={this.state.errors}
                                    formData={this.state.formData}
                                    success={this.state.success}
                                    loading={this.state.loading}
                                    clickedAddAnotherTrade={this.clickedAddAnotherTrade}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
