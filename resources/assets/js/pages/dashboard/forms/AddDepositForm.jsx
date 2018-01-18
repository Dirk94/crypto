import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Auth from "../../../common/auth/Auth.jsx";
import Button from "../../../common/input/Button.jsx";
import TextInput from "../../../common/input/TextInput.jsx";
import SuggestTextInput from "../../../common/input/SuggestTextInput.jsx";

export default class AddDepositForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        formData: PropTypes.object.isRequired,
        success: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
    };

    constructor(props)
    {
        super(props);

        this.coins = [];

        this.state = {
            value: '',
            suggestions: []
        };

        this.onChangeAutoSuggestBuyCoin = this.onChangeAutoSuggestBuyCoin.bind(this);
    }

    onChangeAutoSuggestBuyCoin = (event, { newValue }) => {
        this.props.onChange({
            target: {
                name: 'in_coin_name',
                value: newValue
            }
        });
    }

    onSuggestionsFetchRequested = (value) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }

    getSuggestions = (value) => {
        let input = value.value.trim().toLowerCase();

        return input.length === 0 ? [] : this.coins.filter(
            suggestion => {
                return (
                    suggestion.name.toLowerCase().slice(0, input.length) === input ||
                    suggestion.symbol.toLowerCase().slice(0, input.length) === input
                );
            }
        );
    }

    getSuggestionValue(suggestion)
    {
        return suggestion.api_name;
    }

    renderSuggestion(suggestion)
    {
        return (
            <div>
                {suggestion.name} ({suggestion.symbol})
            </div>
        );
    }

    componentDidMount()
    {
        axios.get('/api/coins', { headers: {
            'Authorization': Auth.getToken()
        }})
            .then((response) => {
                this.coins = response.data;
            })
            .catch((error) => {

            })
            .finally(() => {

            });
    }

    render() {
        return (
            <form className="modal-form" action="/" onSubmit={this.props.onSubmit}>
                {this.props.errors.summary && <p className="error-message">{errors.summary}</p>}

                <SuggestTextInput
                    label={'Buy Coin Name'}
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    name={'in_coin_name'}
                    value={this.props.formData.in_coin_name}
                    onChange={this.onChangeAutoSuggestBuyCoin}
                    errorText={this.props.errors.in_coin_name}
                />

                <TextInput
                    label="Buy Coin Amount"
                    name="in_amount"
                    onChange={this.props.onChange}
                    errorText={this.props.errors.in_amount}
                    value={this.props.formData.in_amount}
                />

                {this.props.success && (
                    <div className="alert alert-success" role="alert">
                        Your deposit has been added<br />
                        <a href="#">Add another trade</a>
                    </div>
                )}

                {!this.props.success && (
                    <Button loading={this.props.loading} inverse={true}>Add Deposit</Button>
                )}
            </form>
        );
    }
}
