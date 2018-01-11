import React from 'react';
import Menu from "./partials/Menu.jsx";
import {Route, Switch} from "react-router-dom";
import Overview from "./pages/Overview.jsx";
import Settings from "./pages/Settings.jsx";
import Trades from "./pages/Trades.jsx";
import Logout from "./pages/Logout.jsx";
import PrivateRoute from "../utils/Auth/PrivateRoute.jsx";

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
                            <PrivateRoute exact path='/dashboard' component={Overview} />
                            <PrivateRoute exact path='/dashboard/settings' component={Settings} />
                            <PrivateRoute exact path='/dashboard/trades' component={Trades} />
                            <PrivateRoute exact path='/dashboard/logout' component={Logout} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
