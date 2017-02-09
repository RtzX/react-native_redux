/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import LFColors from '../basicConfig/LFColors';
import LFHeader from '../basicComponent/common/LFHeader';

export default class LFNotFound extends Component {

    render() {
        let tips =  '';
        if (__DEV__) {
            tips = 'Hey! 请检查你的路由(YYTRouteMapper.js)! Bro!';
        } else {
            tips = "404! 抱歉! 页面找不到了~";
        }

        return (
            <View style={notFoundStyles.container}>
                <LFHeader style = {notFoundStyles.header}
                           foreground = "dark"
                           background = {
                               LFColors.navBarColor
                           }
                           title = "404"
                           leftItem = {{
                               title: '',
                               layout: 'icon',
                               onPress: () => this.props.navigator.pop(),
                           }}
                />
                <Text style={notFoundStyles.tips}>
                    {tips}
                </Text>
            </View>
        );
    }
}

const notFoundStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: LFColors.grayBackground,

    },
    tips: {
        top: LFHeader.height,
    },

    separator: {
        height: 0.5,
        backgroundColor: '#e0e0e0',
    },
    header: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
    },
});