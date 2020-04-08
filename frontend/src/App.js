import { hot } from "react-hot-loader";
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './containers/Header';
import LandingPage from './pages/LandingPage';
import QuotePage from './containers/quote/Quote'
import { connect } from 'react-redux';
import * as actions from './actions'
import { PromptLoginModal } from "./components/modals";


function App(props) {

    return (
        <Router>
            <>
                <PromptLoginModal />
                <Header />
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/get-quote' component={QuotePage} />

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