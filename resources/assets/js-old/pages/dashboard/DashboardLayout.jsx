import React from 'react';
import Menu from "./partials/Menu.jsx";
import {Switch} from "react-router-dom";
import OverviewPage from "./OverviewPage.jsx";
import SettingsPage from "./SettingsPage.jsx";
import TradesPage from "./TradesPage.jsx";
import LogoutPage from "./LogoutPage.jsx";
import PrivateRoute from "../../common/auth/PrivateRoute.jsx";

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
                            <PrivateRoute exact path='/dashboard' component={OverviewPage} />
                            <PrivateRoute exact path='/dashboard/settings' component={SettingsPage} />
                            <PrivateRoute exact path='/dashboard/trades' component={TradesPage} />
                            <PrivateRoute exact path='/dashboard/logout' component={LogoutPage} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
