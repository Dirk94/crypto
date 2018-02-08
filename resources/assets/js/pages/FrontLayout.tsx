import * as React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginPage from "./LoginPage";
import Error404Page from "./Error404Page";

export default class FrontLayout extends React.Component<any, any>
{
    public render()
    {
        return (
            <div>
                <div className="navbar-wrapper">
                    <div className="container">
                        <nav className="navbar navbar-expand-sm navbar-fixed-top navbar-dark bg-dark app-navbar">
                            <Link className="navbar-brand" to='/'>
                                <img className="navbar-brand-icon" src="/images/bird-no-feet-icon.svg"></img>
                                <span className="navbar-brand-text">
                                    <span style={{color: '#1997c6'}}>My</span>CryptoBird
                                </span>
                            </Link>

                            <button className="navbar-toggler navbar-toggler-right d-md-none" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="nav navbar-nav mr-auto">
                                    <li className="nav-item">

                                    </li>
                                </ul>

                                <div className="form-inline d-md-flex ml-auto">
                                    <ul className="nav navbar-nav mr-auto">
                                        <li className="nav-item nav-item-login">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">Create Account</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="container front-container">
                    <Switch>
                        <Route exact path='/'         component={HomePage} />
                        <Route exact path='/register' component={RegisterPage} />
                        <Route exact path='/login'    component={LoginPage} />

                        <Route path='*' component={Error404Page} />
                    </Switch>
                </div>
            </div>
        );
    }
}
