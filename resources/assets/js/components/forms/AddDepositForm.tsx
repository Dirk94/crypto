import * as React from 'react';
import * as PropTypes from 'prop-types';
import CoinTextInput from './fields/CoinTextInput';
import TextInput from './fields/TextInput';
import Button from './fields/Button';

export default class AddDepositForm extends React.Component<any, any>
{
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        errors:   PropTypes.object.isRequired,
        formData: PropTypes.object.isRequired,
        success:  PropTypes.bool.isRequired,
        loading:  PropTypes.bool.isRequired,
        clickedAddAnotherTrade: PropTypes.func.isRequired,
    };

    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return (
            <form className="modal-form" action="/" onSubmit={this.props.onSubmit}>
                {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

                <fieldset>
                    <div className="coinname-field">
                        <CoinTextInput
                            label={'Coin Name'}
                            name={'in_coin_name'}
                            onChange={this.props.onChange}
                            errorText={this.props.errors.in_coin_name}
                            value={this.props.formData.in_coin_name}
                        />
                    </div>

                    <div className={"coinamount-field"}>
                        <TextInput
                            label="Amount (in coins)"
                            name="in_amount"
                            onChange={this.props.onChange}
                            errorText={this.props.errors.in_amount}
                            value={this.props.formData.in_amount}
                        />
                    </div>
                </fieldset>

                {this.props.success && (
                    <div className="alert alert-success" role="alert">
                        Your deposit has been added<br />
                        <a href="" onClick={this.props.clickedAddAnotherTrade}>Add another trade</a>
                    </div>
                )}

                {!this.props.success && (
                    <Button loading={this.props.loading} inverse={true}>Add Deposit</Button>
                )}
            </form>
        );
    }
}
