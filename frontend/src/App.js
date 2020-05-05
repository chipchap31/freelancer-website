import { hot } from "react-hot-loader";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './containers/Header';
import LandingPage from './pages/LandingPage';
import WaitingListPage from './pages/WaitingListPage';
import { connect } from 'react-redux';
import * as actions from './actions'
import { Layout } from "antd";
import QuoteRouter from "./containers/Quoute/QuoteRouter";
import AccountCreated from "./containers/AccountCreated";
import Login from "./containers/Login";

function App(props) {
    const { Footer } = Layout;

    useEffect(() => {
        props.handleAcceptingProject();
        props.handleServicesFetch();
    }, [])


    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) => {
                if (isLoading) {
                    return <Spinner size='large' />;
                } else if (!accept_project && !isLoading) {
                    return <Redirect to="/waiting-list" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
    return (
        <Router>
            <Header />
            <main style={{ minHeight: '83vh' }}>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/get-quote' component={QuoteRouter} />
                    <Route path='/waiting-list' component={WaitingListPage} />
                    <Route path='/account/created' component={AccountCreated} />
                    <Route path='/login' component={Login} />
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