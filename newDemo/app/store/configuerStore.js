/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import createLogger from 'redux-logger';  //导入日志插件

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
});

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    logger
)(createStore);

function configureStore(initialState) {
    return createStoreWithMiddleware(reducers, initialState);
}

// module.exports = configureStore;
export default configureStore;