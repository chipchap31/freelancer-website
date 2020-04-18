import React from 'react';
import ReactDOM from 'react-dom';


import App from "./App";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import '../templates/less/master.less'
import reduxThunk from 'redux-thunk';
const store = createStore(reducer, {}, applyMiddleware(reduxThunk));
const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root);