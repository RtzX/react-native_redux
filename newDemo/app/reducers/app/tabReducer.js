/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
import InitialState from './tabState';

const {
    SER_SWITCH_TABBAR,
} = require('../../actions/actionTypes').default;

const initialState = new InitialState();

function tabReducer(state = initialState,action):State {
    if (!(state instanceof InitialState)) return initialState.merge(state);
    if (action.type == SER_SWITCH_TABBAR ){
        return state.set('tab',action.tab);
    }
    return state;
}

// module.exports = tabReducer;
export default tabReducer;





