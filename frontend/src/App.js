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

import Login from "./containers/Login";
import Dashboard from './containers/Dashboard';
import Spinner from './components/accessories'
function App(props) {
    const { userState } = props;
    const { Footer } = Layout;




    useEffect(() => {
        props.handleAcceptingProject();
        props.handleServicesFetch();
        props.handleAuthentication();

        if (userState.authenticated && !userState.isLoading) {
            props.handleProjectsFetch();
            props.handleProfileFetch(sessionStorage.getItem('auth'))


        }
    }, [])

    const { authenticated, isLoading } = props.userState

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) => {
                if (isLoading) {
                    return <Spinner size='large' />;
                } else if (!authenticated) {
                    return <Redirect to="/login" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
    return (
        <Router>
            <Header {...props.userState} />
            <main style={{ minHeight: '83vh' }}>
                <Switch>

                    <PrivateRoute exact path='/dashboard' component={Dashboard} />

                    <Route path='/get-quote' component={QuoteRouter} />
                    <Route path='/waiting-list' component={WaitingListPage} />

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
        userState: userReducer
    }
}


App = connect(mapStateToProps, actions)(App)
export default hot(module)(App);