/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
const {
    SER_SWITCH_TABBAR,
} = require('../../actions/actionTypes').default;

type Tab = 'home' | 'profile';

module.exports = {
    switchTab: (tab: Tab): Action => ({
        type: SER_SWITCH_TABBAR,
        tab,
    })
};





