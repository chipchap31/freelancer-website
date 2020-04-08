import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route, useRouteMatch } from 'react-router-dom';
import QuoteIndex from "./QuoteIndex";
import LogoQuote from './LogoQuote';
function Quote(props) {



    let match = useRouteMatch();



    return (
        <main>
            <section id='quote' className='padded'>
                <div className='container'>
                    <div className='row'>
                        <Switch>
                            <Route exact path={`${match.path}`}>
                                <QuoteIndex />
                            </Route>
                            <Route path={`${match.path}/logo`}>
                                <LogoQuote />
                            </Route>
                        </Switch>

                    </div>
                </div>
            </section>
        </main >
    )
}
function mapStateToProps(state) {
    return {
        quote: state.quoteReducer
    }
}
export default connect(mapStateToProps)(Quote);





