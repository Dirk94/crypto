import React from 'react';
import Menu from "./layout/Menu.jsx";
import Overview from "./pages/Overview.jsx";
import Settings from "./pages/Settings.jsx";
import Trades from "./pages/Trades.jsx";
import {Route, Switch} from "react-router-dom";

export default class Layout extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3 sidebar">
                        <Menu />
                    </div>
                    <div className="col-md-9 content">
                        <Switch>
                            <Route exact path='/' component={Overview} />
                            <Route exact path='/settings' component={Settings} />
                            <Route exact path='/trades' component={Trades} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
