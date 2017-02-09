/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
import { combineReducers } from 'redux';
import tabReducer from './app/tabReducer';
import homeReducer from './home/homeReducer';

let reduerce = {
    tab:tabReducer,
    home:homeReducer,
};

// module.exports = combineReducers(reduerce);
export  default combineReducers(reduerce);