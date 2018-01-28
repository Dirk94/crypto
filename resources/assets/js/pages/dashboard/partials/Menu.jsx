import React from 'react';
import {Link, NavLink} from "react-router-dom";

export default class Menu extends React.Component
{
    render()
    {
        return (
            <nav className="sidebar-nav sidebar-nav--dashboard">
                <div className="sidebar-header">
                    <button className="nav-toggler nav-toggler-md sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-md">
                        <span className="sr-only">Toggle nav</span>
                    </button>
                    <Link className="sidebar-brand img-responsive" to='/dashboard'>
                        <img className="sidebar-brand-icon" src="/images/bird-icon.svg"></img>
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
        );
    }
}
