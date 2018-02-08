import * as React from 'react';
import Request from '../../common/Request';
import RegisterForm from './RegisterForm';

export default class RegisterFormContainer extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            errors: { },
            success: false,
            loading: false,

            user: {
                name:     '',
                email:    '',
                password: '',
            }
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    private formSubmit(event: any)
    {
        event.preventDefault();
        this.setState({loading: true});

        Request.post('/api/register', this.state.user)
            .then((response: any) => {
                this.setState({
                    success: true,
                    loading: false
                });
            })
            .catch((error: any) => {
                let data = error.response.data;
                this.setState({
                    errors: data.errors,
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
            <RegisterForm
                onSubmit={this.formSubmit}
                onChange={this.updateUser}
                errors={this.state.errors}
                success={this.state.success}
                user={this.state.user}
                loading={this.state.loading}
            />
        )
    }
}
