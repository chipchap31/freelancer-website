import React from 'react';
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';


function App(){
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
export default App;