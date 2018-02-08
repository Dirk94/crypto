import * as React from "react";
import * as PropTypes from 'prop-types';
import TextInput from "./fields/TextInput";
import Button from "./fields/Button";
import {Link} from "react-router-dom";

export default class RegisterForm extends React.Component<any, any>
{
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        errors:   PropTypes.object.isRequired,
        user:     PropTypes.object.isRequired,
        success:  PropTypes.bool.isRequired,
        loading:  PropTypes.bool.isRequired,
    }

    public render()
    {
        return (
            <form action='/' onSubmit={this.props.onSubmit}>
                <h1>Create Account</h1>

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
                    <Button loading={this.props.loading} inverse={false}>Create Account</Button>
                )}

            </form>
        )
    }
}
