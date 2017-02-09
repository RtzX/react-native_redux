/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
import {
    Record,
    List,
    Map
} from 'immutable';

let InitialState = Record({
    isFetching: false,
    error: null,
    ptr: false, // pull to refresh
});

export default InitialState;