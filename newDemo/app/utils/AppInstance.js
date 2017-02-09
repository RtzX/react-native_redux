/**
 * Created by my_liu on 2017/2/8.
 */
'use strict';

import React from 'react';
import {
    AsyncStorage,
    NativeModules
} from 'react-native';

var AppInstance = (function () {
    var appInstance;

    function shareInstance(opts) {
        if (!appInstance) {
            appInstance = new AppInstance();
        }

        return appInstance;
    }

    function AppInstance() {

        this.navigator; // 导航
        this.tab; // tabview
        this.isLogin = false; //是否登录
    }

    // 弹出登录页面
    AppInstance.prototype.needLogin = function (operation) {
        if (this.isLogin) {
            operation && operation();
        } else {
            this.navigator.push({name: 'LoginContainer', operation: operation})
        }
    };

    return {
        shareInstance: shareInstance
    }
})();

// module.exports = AppInstance;
export default AppInstance;