import * as bootstrap from 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Chart from 'chart.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import FrontLayout from './pages/FrontLayout';
import Error404Page from "./pages/Error404Page";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontFamily = '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif';

ReactDOM.render(
    (
        <BrowserRouter>
            <Switch>
                <Route path='/dashboard' component={DashboardLayout} />
                <Route path='/' component={FrontLayout} />

                <Route path='*' component={Error404Page} />
            </Switch>
        </BrowserRouter>
    ), document.getElementById('root')
);
