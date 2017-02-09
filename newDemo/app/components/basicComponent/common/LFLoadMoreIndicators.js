/**
 * Created by my_liu on 2017/2/8.
 */
'use strict';

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    Platform,
} from 'react-native';

export default class LFLoadMoreIndicators extends Component {

    static propTypes = {
        isVisible: React.PropTypes.bool.isRequired,
        animating: React.PropTypes.bool,
        text: React.PropTypes.string,
    };

    static defaultProps = {
        text: '加载中...',
    };

    render() {
        if (this.props.isVisible) {
            return (
                <View style={LoadIndicatorStyles.container}>
                    {this.props.animating ?
                        <ActivityIndicator style={LoadIndicatorStyles.indicator} size={'small'} /> :
                        null}

                    <Text style={LoadIndicatorStyles.text}>{this.props.text}</Text>
                </View>
            );
        } else {
            return null;
        }
    }
}

const LoadIndicatorStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
    },
    indicator: {

    },
    text: {
        marginLeft: 10,
        textAlign: 'center',
        color:'#b1b1b1',
    },
});