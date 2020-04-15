import { hot } from "react-hot-loader";
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './containers/Header';
import LandingPage from './pages/LandingPage';
import { connect } from 'react-redux';
import * as actions from './actions'
import Login from './containers/Login';
import Quote from './containers/Quote';
import { Layout } from "antd";

function App(props) {
    const { Footer, Content } = Layout;
    return (
        <Router>

            <Header />
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/get-quote' component={Quote} />
                <Route path='/login' component={Login} />
            </Switch>

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