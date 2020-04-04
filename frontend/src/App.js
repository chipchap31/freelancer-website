import React from 'react';
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom';
import Header from './containers/Header';
import Landing from './pages/Landing';
import { connect } from 'react-redux';
import * as actions from './actions'
function App(props){
    React.useEffect(() => {
        console.log(props);
        
    }) 
    return (
        <Router>
            <>
                <Header />
                <Switch>
                    <Route exact path='/' component={Landing} />
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

export default connect(mapStateToProps, actions)(App);