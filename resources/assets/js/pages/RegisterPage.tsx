import * as React from 'react';
import RegisterFormContainer from "../components/forms/RegisterFormContainer";

export default class RegisterPage extends React.Component<any, any>
{
    public render()
    {
        return (
            <div className="col-md-8 offset-md-2">
                <RegisterFormContainer />
            </div>
        )
    }
}
