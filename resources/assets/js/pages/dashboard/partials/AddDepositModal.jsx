import React from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import Auth from '../../../common/auth/Auth.jsx';
import AddTradeForm from "../forms/AddTradeForm.jsx";
import AddDepositForm from "../forms/AddDepositForm.jsx";

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
    }

    processForm(event)
    {
        this.setState({ loading: true });

        event.preventDefault();

        axios.post('/api/portfolios/' + localStorage.getItem('defaultPortfolioId') + '/deposit', this.state.formData, { headers: {
            'Authorization': Auth.getToken()
        }})
            .then((response) => {
                console.log("success");
                console.log(response);

                this.setState({
                    success: true
                });
            })
            .catch((error) => {
                let data = error.response.data;
                console.log(data.errors);
                this.setState({
                    errors: data.errors
                });
            })
            .finally(() => {
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
                                <h5 className="modal-title" id="exampleModalLabel">Add Deposit</h5>
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
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
