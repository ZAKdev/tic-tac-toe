// For borwser compatibility
import 'babel-polyfill';

import { Router, Route, hashHistory } from 'react-router';
import { connect, Provider } from "react-redux";

const
    React = require("react"),
    ReactDOM = require("react-dom"),
    reduxStore = require("./reduxStore"),
    AppRoute = require("./App/AppRoute");


ReactDOM.render(
    <Provider store={reduxStore}>
        <Router history={hashHistory}>
            <Route component={AppRoute}>
                <Route path="/" component={AppRoute}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("mount-node")
)

window.reduxStore = reduxStore;