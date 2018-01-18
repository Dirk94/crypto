import React from 'react';
import PropTypes from 'prop-types';
import Auth from "../auth/Auth.jsx";
import axios from 'axios';
import SuggestTextInput from "./SuggestTextInput";

class CoinTextInput extends React.Component
{
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func,
    }

    constructor(props)
    {
        super(props);

        this.coins = [];

        this.state = {
            value: '',
            suggestions: []
        };

        this.onChangeValue = this.onChangeValue.bind(this);
    }

    componentDidMount()
    {
        axios.get('/api/coins', { headers: {
            'Authorization': Auth.getToken()
        }})
            .then((response) => {
                this.coins = response.data;
            });
    }

    render()
    {
        return (
            <SuggestTextInput
                label={this.props.label}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                name={'in_coin_name'}
                value={this.props.formData.in_coin_name}
                onChange={this.onChangeValue}
                errorText={this.props.errors.in_coin_name}
            />
        )
    }

    onChangeValue = (event, { newValue }) => {
        this.props.onChange({
            target: {
                name: this.prop.name,
                value: newValue
            }
        });
    }

    onSuggestionsFetchRequested = (value) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
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

    getSuggestionValue = (suggestion) => {
        return suggestion.api_name;
    }

    renderSuggestion = (suggestion) => {
        return (
            <div>
                {suggestion.name} ({suggestion.symbol})
            </div>
        );
    }
}
