import React from 'react';
import Menu from "./partials/Menu.jsx";
import {Route, Switch} from "react-router-dom";
import Overview from "./pages/Overview.jsx";
import Settings from "./pages/Settings.jsx";
import Trades from "./pages/Trades.jsx";
import Logout from "./pages/Logout.jsx";

export default class DashboardLayout extends React.Component
{
    render()
    {
        return (
            <div className="container dashboard-wrapper">
                <div className="row">
                    <div className="col-md-3 sidebar">
                        <Menu />
                    </div>
                    <div className="col-md-9 content">
                        <Switch>
                            <Route exact path='/dashboard' component={Overview} />
                            <Route exact path='/dashboard/settings' component={Settings} />
                            <Route exact path='/dashboard/trades' component={Trades} />
                            <Route exact path='/dashboard/logout' component={Logout} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
