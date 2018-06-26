import * as React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import OverviewPage from './OverviewPage';
import {Link, Switch, NavLink, Route} from 'react-router-dom';
import Error404Page from '../Error404Page';
import LogoutPage from "./LogoutPage";
import TradesPage from "./TradesPage";

export default class DashboardLayout extends React.Component<any, any>
{
    public render()
    {
        return (
            <div className="container dashboard-wrapper">
                <div className="row">
                    <div className="col-md-3 sidebar">
                        <nav className="sidebar-nav sidebar-nav--dashboard">
                            <div className="sidebar-header">
                                <button className="nav-toggler nav-toggler-md sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-md">
                                    <span className="sr-only">Toggle nav</span>
                                </button>
                                <Link className="sidebar-brand img-responsive" to='/dashboard'>
                                    <img className="sidebar-brand-icon" src="/images/bird-no-feet-icon.svg"></img>
                                    <span className="sidebar-brand-text"><span style={{color: '#1997c6'}}>My</span>CryptoBird</span>
                                </Link>
                            </div>

                            <div className="collapse nav-toggleable-md" id="nav-toggleable-md">
                                <ul className="nav nav-pills nav-stacked flex-column">
                                    <li className="nav-header">Trading</li>
                                    <li className="nav-item">
                                        <NavLink exact activeClassName="active" className="nav-link" to='/dashboard'>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeClassName="active" className="nav-link" to='/dashboard/trades'>Your Trades</NavLink>
                                    </li>

                                    <li className="nav-header">Settings</li>
                                    <li className="nav-item">
                                        <NavLink activeClassName="active" className="nav-link" to='/dashboard/settings'>Account Settings</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeClassName="active" className="nav-link" to='/dashboard/logout'>Logout</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="col-md-9 content">
                        <Switch>
                            <PrivateRoute exact path='/dashboard' component={OverviewPage} />
                            <PrivateRoute exact path='/dashboard/logout' component={LogoutPage} />
                            <PrivateRoute exact path='/dashboard/trades' component={TradesPage} />

                            <Route path='*' component={Error404Page} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
