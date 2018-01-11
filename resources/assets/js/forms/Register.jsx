import React  from 'react';
import PropTypes from 'prop-types';
import TextInput from "../utils/input/TextInput.jsx";
import {Link} from "react-router-dom";
import Button from "../utils/input/Button.jsx";

export default class Register extends React.Component
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
                <h1>Create Account</h1>

                {this.props.errors.summary && <p className="error-message">{errors.summary}</p>}

                <TextInput
                    label="Name"
                    name="name"
                    onChange={this.props.onChange}
                    errorText={this.props.errors.name}
                    value={this.props.user.name}
                />

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

                {this.props.success && (
                    <div className="alert alert-success" role="alert">
                        Your account has been created, you can now <Link to="/login">login</Link>
                    </div>
                )}

                {!this.props.success && (
                    <Button loading={this.props.loading}>Create Account</Button>
                )}
            </form>
        );
    }
}
