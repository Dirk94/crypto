import React  from 'react';
import PropTypes from 'prop-types';
import TextInput from "../utils/input/TextInput.jsx";
import {Link} from "react-router-dom";
import Button from "../utils/input/Button.jsx";

export default class Login extends React.Component
{
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        success: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
    };

    render()
    {
        return (
            <form action="/" onSubmit={this.props.onSubmit}>
                <h1>Login</h1>

                {this.props.errors.summary && <p className="error-message">{errors.summary}</p>}

                <TextInput
                    label="Email"
                    name="email"
                    onChange={this.props.onChange}
                    errorText={this.props.errors.email}
                    value={this.props.user.email}
                />

                <TextInput
                    type="password"
                    label="Password"
                    name="password"
                    onChange={this.props.onChange}
                    errorText={this.props.errors.password}
                    value={this.props.user.password}
                />

                <Button loading={this.props.loading}>Login</Button>
            </form>
        );
    }
}
