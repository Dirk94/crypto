import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';

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
                                <span className="navbar-brand-text">CryptoCoinTracker</span>
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

                                <div className="form-inline d-none d-md-flex ml-auto">
                                    <ul className="nav navbar-nav mr-auto">
                                        <li className="nav-item nav-item-login">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="btn btn-primary" to="/register">Create Account</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/register' component={Register} />
                        <Route exact pahh='/login' component={Login} />
                    </Switch>
                </div>
            </div>
        );
    }
}
