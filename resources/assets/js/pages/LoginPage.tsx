import * as React from 'react';
import RegisterFormContainer from "../components/forms/RegisterFormContainer";
import LoginFormContainer from "../components/forms/LoginFormContainer";

export default class LoginPage extends React.Component<any, any>
{
    public render()
    {
        return (
            <div className="col-md-8 offset-md-2">
                <LoginFormContainer
                    history={this.props.history}
                />
            </div>
        )
    }
}
