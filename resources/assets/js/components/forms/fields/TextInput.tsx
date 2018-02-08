import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class TextInput extends React.Component<any, any>
{
    static propTypes = {
        type:      PropTypes.string,
        label:     PropTypes.string,
        name:      PropTypes.string.isRequired,
        onChange:  PropTypes.func,
        errorText: PropTypes.array,
        value:     PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    public render()
    {
        let errorText;
        if (this.props.errorText) {
            errorText = (
                <div className="invalid-feedback">{this.props.errorText}</div>
            );
        }

        return (
            <div className={"form-group"}>
                <label>{this.props.label}</label>
                <input
                    type={this.props.type ? this.props.type : "text"}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    className={this.props.errorText ? "form-control is-invalid" : "form-control"}
                />
                {errorText}
            </div>
        )
    }
}

