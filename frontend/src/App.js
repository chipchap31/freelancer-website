import { hot } from "react-hot-loader";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './containers/Header';
import LandingPage from './pages/LandingPage';
import WaitingListPage from './pages/WaitingListPage';
import { connect } from 'react-redux';
import * as actions from './actions'

import { Layout, Button } from "antd";
import QuoteRouter from "./containers/Quoute/QuoteRouter";

function App(props) {
    const { Footer } = Layout;

    useEffect(() => {
        props.handleAcceptingProject();
        props.handleServicesFetch();
    }, [])



    return (
        <Router>

            <Header />


            <main style={{ minHeight: '83vh' }}>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/get-quote' component={QuoteRouter} />
                    <Route path='/waiting-list' component={WaitingListPage} />
                </Switch>
            </main>


            <Footer>
                <div className='container'>
                    Footer
                </div>

            </Footer>

        </Router >

    )
}

function mapStateToProps({ userReducer }) {
    return {
        user: userReducer
    }
}
App = connect(mapStateToProps, actions)(App)
export default hot(module)(App);