import React from 'react';
import {Link, NavLink} from "react-router-dom";

export default class Menu extends React.Component
{
    render()
    {
        return (
            <nav className="sidebar-nav">
                <div className="sidebar-header">
                    <button className="nav-toggler nav-toggler-md sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-md">
                        <span className="sr-only">Toggle nav</span>
                    </button>
                    <Link className="sidebar-brand img-responsive" to='/dashboard'>
                        <span className="icon icon-rocket sidebar-brand-icon"></span>
                        <span className="sidebar-brand-text">CryptoCoinTracker</span>
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
                    <hr className="visible-xs mt-3" />
                </div>
            </nav>
        );
    }
}
