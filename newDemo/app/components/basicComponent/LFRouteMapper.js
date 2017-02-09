/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
import React, {Component} from 'react';
import LFNotFound from './LFNotFound';
import LFTabViews from './LFTabViews';

import HomeContainer from '../../containers/home/HomeContainer';
import ProfileContainer from '../../containers/profile/ProfileContainer';

let LFRouteMapper = function (route, navigationOperations, onComponentRef) {
    // body...
    //
    // default
    if (route.name === 'LFTabViews') {
        return (<LFTabViews  {...route}/>);
    } else if (route.name === 'CommunityDetailContainer') {
        return (<CommunityDetailContainer  {...route}/>);
    } else {
        return (<LFNotFound  {...route} />);
    }
};

// module.exports = LFRouteMapper;
export default LFRouteMapper;