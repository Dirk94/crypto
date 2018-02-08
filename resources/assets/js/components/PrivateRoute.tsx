import * as React from 'react';
import Auth from '../common/Auth';
import {Redirect, Route} from "react-router-dom";

export default class PrivateRoute extends React.Component<any, any>
{
    public render() {
        return (
            Auth.isLoggedIn() ? (
                <Route exact  component={this.props.component} />
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: this.props.location}
                }}/>
            )
        );
    }
}
