/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';

import {
    Record,
    List,
    Map
} from 'immutable';

type Tab = 'home' | 'profile';

let InitialState = Record({
    tab:'home'
});

export default InitialState;