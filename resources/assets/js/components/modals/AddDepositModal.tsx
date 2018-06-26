import * as React from 'react';
import Request from '../../common/Request';
import Session from '../../common/Session';
import AddDepositForm from '../forms/AddDepositForm';

export default class AddDepositModal extends React.Component<any, any>
{
    constructor(props: any)
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
                type: 'deposit'
            },
            open: false,
        }

        this.processForm = this.processForm.bind(this);
        this.changeFormData = this.changeFormData.bind(this);
        this.clickedAddAnotherTrade = this.clickedAddAnotherTrade.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    processForm(event: any)
    {
        this.setState({ loading: true });

        event.preventDefault();

        Request.post('/api/portfolios/' + Session.get('portfolio_id') + '/transactions', this.state.formData)
            .then((response: any) => {
                location.reload();
            })
            .catch((error: any) => {
                let data = error.response.data;
                console.log(data.errors);
                this.setState({
                    errors: data.errors
                });

                this.setState({loading: false});
            });
    }

    changeFormData(event: any)
    {
        const field = event.target.name;
        const formData = this.state.formData;
        formData[field] = event.target.value;

        this.setState({
            formData
        });
    }

    clickedAddAnotherTrade(event: any)
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

    toggleModal(event: any)
    {
        event.preventDefault();
        this.setState({ open: ! this.state.open });
    }

    render()
    {
        return (
            <div>
                <button onClick={this.toggleModal} type="button" className="btn btn-outline-primary btn-float">
                    <span className="icon icon-align-bottom"></span>&nbsp;
                    Add Deposit
                </button>

                {this.state.open && (
                    <div className="modal" id="addDepositModal" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel"><span className="icon icon-align-bottom"></span>&nbsp;Add Deposit</h5>
                                    <button onClick={this.toggleModal} type="button" className="close">
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
                )}
            </div>
        )
    }
}