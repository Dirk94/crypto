import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import LoginPage from './LoginPage.jsx';
import Auth from "../common/auth/Auth.jsx";

export default class FrontLayout extends React.Component
{
    render()
    {
        return (
            <div>
                <div className="navbar-wrapper">
                    <div className="container">
                        <nav className="navbar navbar-expand-sm navbar-fixed-top navbar-dark bg-dark app-navbar">
                            <Link className="navbar-brand" to='/'>
                                <span className="icon icon-rocket navbar-brand-icon"></span>
                                <span className="navbar-brand-text"></span>
                            </Link>

                            <button className="navbar-toggler navbar-toggler-right d-md-none" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="nav navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/about">About us</Link>
                                    </li>
                                </ul>

                                <div className="form-inline d-md-flex ml-auto">
                                    <ul className="nav navbar-nav mr-auto">
                                        <li className="nav-item nav-item-login">
                                            {Auth.isLoggedIn() ? (
                                                <Link className="btn btn-primary" to="/dashboard">Dashboard</Link>
                                            ) : (
                                                <Link className="nav-link" to="/login">Login</Link>
                                            )}
                                        </li>
                                        <li className="nav-item">
                                            {! Auth.isLoggedIn() && ( <Link className="btn btn-primary" to="/register">Create Account</Link> )}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="container front-container">
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/about' component={AboutPage} />
                        <Route exact path='/register' component={RegisterPage} />
                        <Route exact pahh='/login' component={LoginPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}
