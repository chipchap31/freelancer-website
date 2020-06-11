import { hot } from "react-hot-loader";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import WaitingListPage from './pages/WaitingListPage';
import { connect } from 'react-redux';
import * as actions from './actions'
import Login from "./containers/Login";
import Dashboard from './containers/Dashboard';
import Spinner from './components/accessories';
import QuoteRouter from "./containers/QuoteIndex";
import Welcome from "./containers/Welcome";
import Header from './containers/Header';
import ProjectList from "./containers/ProjectList";
import ProjectView from "./containers/ProjectView";
import Footer from './containers/Footer';
import LandingView from "./containers/LandingView";
import ProfileView from "./containers/ProfileView";
import ProjectAccept from './containers/ProjectAccept';
import Works from "./containers/Works";
import WorkDetailed from "./containers/WorksDetailed";
function App(props) {

    const { authenticated, isLoading, password_changed } = props.userState;

    useEffect(() => {
        props.handleAuthentication();
        props.handleAcceptingProject();
        props.handleServicesFetch();
        props.handlePublicProjectFetch();

        if (authenticated && !isLoading) {
            props.handleProjectsFetch();
            // get user profile using the the id stored  session storage
            props.handleProfileFetch(sessionStorage.getItem('auth'))
        }

    }, [])

    const PrivateRoute = ({ component: Component, exempt, ...rest }) => (

        <Route
            {...rest}

            render={(props) => {


                if (isLoading) {
                    return <Spinner size='large' />
                } else if (!authenticated) {
                    return <Redirect to="/login" />;

                } else if (!exempt && password_changed === '0') {
                    return <Redirect to='/welcome' />
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );

    if (isLoading) {
        return <Spinner size='large' />
    }

    return (
        <Router>
            <>
                <Header />
                <main style={{ minHeight: '83vh' }}>
                    <Switch>
                        <Route exact path='/' component={LandingView} />
                        <PrivateRoute exempt={false} exact path='/dashboard' component={Dashboard} />
                        <PrivateRoute exempt={false} exact path='/projects' component={ProjectList} />
                        <PrivateRoute exempt={false} exact path='/projects/:id' component={ProjectView} />
                        <PrivateRoute exempt={true} path='/welcome' component={Welcome} />
                        <PrivateRoute exempt={true} path='/profile' component={ProfileView} />
                        <PrivateRoute exempt={true} path='/projects/accept/:project_id/concept/:concept_id' component={ProjectAccept} />

                        <Route exact path='/works' component={Works} />
                        <Route path='/works/:id' component={WorkDetailed} />
                        <Route path='/get-quote' component={QuoteRouter} />
                        <Route path='/waiting-list' component={WaitingListPage} />
                        <Route path='/login' component={Login} />
                    </Switch>
                </main>
                <Footer />
            </>
        </Router >

    )
}

function mapStateToProps(state) {
    return {
        userState: state.userReducer,
        profileState: state.profileReducer
    }
}


App = connect(mapStateToProps, actions)(App)
export default hot(module)(App);