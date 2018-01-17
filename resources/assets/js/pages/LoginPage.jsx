import React from 'react';
import LoginForm from './forms/LoginForm.jsx';
import axios from 'axios';
import Auth from "../common/auth/Auth.jsx";

export default class LoginPage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            errors: {},
            success: false,
            loading: false,
            user: {
                email: '',
                password: '',
            },
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event)
    {
        this.setState({loading: true});

        event.preventDefault();

        axios.post('/api/login', this.state.user)
            .then((response) => {
                let token = response.data.token;
                localStorage.setItem('defaultPortfolioId', response.data.default_portfolio_id);

                Auth.authenticateUser(token);
                this.props.history.push('/dashboard');
            })
            .catch((error) => {
                this.setState({
                    errors: {
                        email: ["The email or password is incorrect"]
                    }
                });
            })
            .finally(() => {
                this.setState({loading: false});
            });
    }

    changeUser(event)
    {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    render()
    {
        return (
            <div className="col-md-8 offset-md-2">
                <LoginForm
                    onSubmit={this.processForm}
                    onChange={this.changeUser}
                    errors={this.state.errors}
                    success={this.state.success}
                    user={this.state.user}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}
