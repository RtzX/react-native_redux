/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
import React, { Component } from 'react';

import App from './App';
import { Provider } from 'react-redux';
import configureStore from '../app/store/configuerStore';
import tabState from '../app/reducers/app/tabState';
import homeState from '../app/reducers/home/homeState';

function getInitialState() {
    const _initState = {
        tab: (new tabState()),
    };

    return _initState;
}

class Root extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isLoading: false,
            store:configureStore(getInitialState())
        };
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }
        return (
            <Provider store={this.state.store}>
                <App />
            </Provider>
        )
    }
}

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

export default Root;
