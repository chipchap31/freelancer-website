import { hot } from "react-hot-loader";
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './containers/Header';
import LandingPage from './pages/LandingPage';
import QuotePage from './pages/QuotePage'
import { connect } from 'react-redux';
import * as actions from './actions'
function App(props) {
    React.useEffect(() => {


    })
    return (
        <Router>
            <>
                <Header />
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/get-quote' component={QuotePage} />

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