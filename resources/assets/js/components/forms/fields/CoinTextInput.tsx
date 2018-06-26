import * as React from 'react';
import * as PropTypes from 'prop-types';
import SuggestTextInput from './SuggestTextInput';
import CoinData from "../../../common/CoinData";

export default class CoinTextInput extends React.Component<any, any>
{
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func,
        errorText: PropTypes.array,
    }

    coins: any;

    constructor(props: any)
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
            .then((coins: any) => {
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

    onChangeValue = (event: any, obj: any) => {
        this.props.onChange({
            target: {
                name: this.props.name,
                value: obj.newValue
            }
        });
    }

    onSuggestionsFetchRequested = (value: any) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }

    getSuggestions = (value: any) => {
        let input = value.value.trim().toLowerCase();

        console.log(this.coins);

        return input.length === 0 ? [] : this.coins.filter(
            (suggestion: any) => {
                return (
                    suggestion.name.toLowerCase().slice(0, input.length) === input ||
                    suggestion.symbol.toLowerCase().slice(0, input.length) === input
                );
            }
        );
    }

    getSuggestionValue = (suggestion: any) => {
        return suggestion.name;
    }

    renderSuggestion = (suggestion: any) => {
        return (
            <div>
                {suggestion.name} ({suggestion.symbol})
            </div>
        );
    }
}
