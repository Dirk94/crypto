import * as React from 'react';
import * as PropTypes from 'prop-types';
import Request from '../../common/Request';
import Session from '../../common/Session';
import Auth from '../../common/Auth';
import LoginForm from "./LoginForm";

export default class LoginFormContainer extends React.Component<any, any>
{
    static propTypes = {
        history: PropTypes.object
    };

    constructor(props: any)
    {
        super(props);

        console.log(props);

        this.state = {
            errors: {},
            success: false,
            loading: false,
            user: {
                email: '',
                password: ''
            }
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    private formSubmit(event: any)
    {
        event.preventDefault();
        this.setState({loading: true});

        Request.post('/api/login', this.state.user)
            .then((response: any) => {
                let token = response.data.token;
                Auth.logout();
                Auth.login(token);
                Session.store('portfolio_id', response.data.default_portfolio_id);
                this.props.history.push('/dashboard');
            })
            .catch((error: any) => {
                console.log(error);

                this.setState({
                    errors: { email: ["The email or password is incorrect"] },
                    loading: false,
                });
            });
    }

    private updateUser(event: any)
    {
        const field = event.target.name;
        let user = this.state.user;

        user[field] = event.target.value;
        this.setState({user});
    }

    public render()
    {
        return (
            <LoginForm
                onSubmit={this.formSubmit}
                onChange={this.updateUser}
                errors=  {this.state.errors}
                success= {this.state.success}
                user=    {this.state.user}
                loading= {this.state.loading}
            />
        );
    }
}
