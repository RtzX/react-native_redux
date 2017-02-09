/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    Navigator,
} from 'react-native';
import LFTabViews from './LFTabViews';
import LFRouteMapper from './LFRouteMapper';
import BackAndroidTool from './common/BackAndroidTool';
import AppInstance from '../../utils/AppInstance';

class LFNavigator extends Component {
    static propTypes = {
        tab: React.PropTypes.string,
        onTabSelect: React.PropTypes.func,
        navigator: Navigator,
    };

    onTabSelect(tab: Tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    constructor(props) {
        // this._handlers: ([]: Array<() => boolean>);
        super(props);

        this._handlers = [];

        BackAndroidTool.customHandleBack(this.props.navigator, () => {
            Alert.alert('提示', '您还未保存记录,确定要返回么?',
                [{
                    text: '取消', onPress: () => {
                    }
                },
                    {
                        text: '确定', onPress: () => {
                        this.props.navigator.pop();
                    }
                    }
                ]);
            // 一定要 return true; 原因上面的参考链接里有
            return true;
        });
    }

    componentDidMount() {
        // 添加返回键监听
        BackAndroidTool.addBackAndroidListener(this.refs.navigator);
        AppInstance.shareInstance().navigator = this.refs.navigator;
    }

    componentWillUnmount() {
        // 移除返回键监听
        BackAndroidTool.removeBackAndroidListener();
    }

    getChildContext() {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener,
        };
    }

    addBackButtonListener(listener) {
        this._handlers.push(listener);
    }

    removeBackButtonListener(listener) {
        this._handlers = this._handlers.filter((handler) => handler !== listener);
    }


    render() {

        return (

            <Navigator
                ref="navigator"
                style={styles.container}
                configureScene={(route) => {
                    let sceneConfigs;
                    if (Platform.OS === 'android') {
                        sceneConfigs = Navigator.SceneConfigs.FloatFromBottomAndroid;
                    } else if (route.name == 'LoginContainer'
                        || route.name == 'CommunityTopicContainer'
                        || route.name == 'SearchStoreContainer' // 城市列表
                    ) {
                        sceneConfigs = Navigator.SceneConfigs.FloatFromBottom;
                    } else {
                        sceneConfigs = Navigator.SceneConfigs.FloatFromRight;
                    }

                    return {
                        ...sceneConfigs,

                    };

                    //gestures: true

                }}
                initialRoute={{name: 'LFTabViews'}}
                renderScene={LFRouteMapper}
            />

        );
    }
}

LFNavigator.childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

// module.exports = LFNavigator;
export default LFNavigator;