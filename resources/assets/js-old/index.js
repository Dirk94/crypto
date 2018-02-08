// Simply import bootstrap to add it to the Webpack dependency graph.
// It will now be bundled in our app.js bundle.
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import FrontLayout from './pages/FrontLayout.jsx';
import Chart from 'chart.js';

Chart.defaults.global.defaultFontColor  = 'white';
Chart.defaults.global.defaultFontFamily = '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route path='/dashboard' component={DashboardLayout} />
            <Route path='/' component={FrontLayout} />
        </Switch>
    </BrowserRouter>
    ), document.getElementById('root')
);
