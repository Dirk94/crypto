import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from "react-autosuggest";

export default class SuggestTextInput extends React.Component
{
    static propTypes = {
        label: PropTypes.string,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        errorText: PropTypes.array,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    render()
    {
        let errorText;
        if (this.props.errorText) {
            errorText = (
                <div className="invalid-feedback invalid-feedback--always-show">{this.props.errorText}</div>
            );
        }

        return (
            <div className={"form-group"}>
                <label>{this.props.label}</label>
                <Autosuggest
                    suggestions={this.props.suggestions}
                    onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
                    getSuggestionValue={this.props.getSuggestionValue}
                    renderSuggestion={this.props.renderSuggestion}
                    inputProps={{
                        name: this.props.name,
                        value: this.props.value,
                        onChange: this.props.onChange,
                        className: this.props.errorText ? "form-control is-invalid" : "form-control"
                    }}
                />
                {errorText}
            </div>
        )
    }
}
