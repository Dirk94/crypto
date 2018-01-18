import React from 'react';
import RegisterForm from './forms/RegisterForm.jsx';
import axios from 'axios';

export default class Register extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            errors: {},
            success: false,
            loading: false,
            user: {
                name: '',
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

        axios.post('/api/register', this.state.user)
            .then((response) => {
                console.log("success");
                console.log(response);

                this.setState({
                    success: true,
                    loading: false
                });
            })
            .catch((error) => {
                let data = error.response.data;
                console.log(data);
                this.setState({
                    errors: data.errors,
                    loading: false,
                });
            })
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
                <RegisterForm
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
