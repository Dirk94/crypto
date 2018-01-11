import React from 'react';
import Auth from '../../utils/Auth/Auth.jsx';
import { withRouter } from 'react-router-dom';

export default class Logout extends React.Component
{
    componentDidMount()
    {
        Auth.userLogout();
        this.props.history.push('/');
    }

    render()
    {
        return (<div></div>);
    }
}
