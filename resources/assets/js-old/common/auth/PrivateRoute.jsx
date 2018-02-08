import React from 'react';
import Auth from './Auth.jsx';
import {Redirect, Route} from "react-router-dom";

export default class PrivateRoute extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Auth.isLoggedIn() ? (
                <Route exact to={this.props.to} component={this.props.component} />
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: this.props.location}
                }}/>
            )
        );
    }
}
