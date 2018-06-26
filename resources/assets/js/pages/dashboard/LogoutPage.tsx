import * as React from 'react';
import Auth from '../../common/Auth';

export default class LogoutPage extends React.Component<any, any>
{
    componentDidMount()
    {
        Auth.logout();
        this.props.history.push('/');
    }

    render()
    {
        return (
            <div></div>
        )
    }
}
