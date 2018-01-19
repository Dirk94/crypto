import React from 'react';
import PropTypes from 'prop-types';
import Auth from "../auth/Auth.jsx";
import axios from 'axios';
import SuggestTextInput from "./SuggestTextInput.jsx";
import CoinData from "../data/CoinData.jsx";

export default class CoinTextInput extends React.Component
{
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func,
        errorText: PropTypes.array,
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
        CoinData.getCoinData()
            .then((coins) => {
                this.coins = coins;
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
                name={this.props.name}
                value={this.props.value}
                onChange={this.onChangeValue}
                errorText={this.props.errorText}
            />
        )
    }

    onChangeValue = (event, { newValue }) => {
        this.props.onChange({
            target: {
                name: this.props.name,
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

        console.log(this.coins);

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
        return suggestion.name;
    }

    renderSuggestion = (suggestion) => {
        return (
            <div>
                {suggestion.name} ({suggestion.symbol})
            </div>
        );
    }
}
