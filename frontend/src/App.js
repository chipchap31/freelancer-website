import { hot } from "react-hot-loader";
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './containers/Header';
import LandingPage from './pages/LandingPage';

import { connect } from 'react-redux';
import * as actions from './actions'
import { PromptLoginModal } from "./components/modals";
import Login from './containers/Login'
import Quote from './containers/Quote'
function App(props) {

    return (
        <Router>
            <>
                <PromptLoginModal />
                <Header />
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/get-quote' component={Quote} />
                    <Route path='/login' component={Login} />
                </Switch>
            </>
        </Router>
    )
}

function mapStateToProps({ userReducer }) {
    return {
        user: userReducer
    }
}
App = connect(mapStateToProps, actions)(App)
export default hot(module)(App);