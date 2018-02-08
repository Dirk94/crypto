import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from "./fields/Button";
import TextInput from "./fields/TextInput";

export default class LoginForm extends React.Component<any, any>
{
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        errors:   PropTypes.object.isRequired,
        user:     PropTypes.object.isRequired,
        success:  PropTypes.bool.isRequired,
        loading:  PropTypes.bool.isRequired,
    };

    public render()
    {
        return (
            <form action="/" onSubmit={this.props.onSubmit}>
                <h1>Login</h1>

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

                <Button loading={this.props.loading} inverse={false}>Login</Button>
            </form>
        );
    }
}
