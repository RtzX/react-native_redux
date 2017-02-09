/**
 * Created by my_liu on 2017/2/8.
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';

// const PROGRESS_SIZE = 50;
const HUD_DURATION = 10 * 1000;
export default class LFProgressHUD extends Component {
    static propTypes = {
        data: ImmutablePropTypes.contains({
            id: React.PropTypes.number.isRequired,
            content: React.PropTypes.string.isRequired,
        }),

        showProgressHUD: React.PropTypes.func,
        dismissProgressHUD: React.PropTypes.func

    };

    showProgressHUD(){
        this.setState({is_hud_visible: true});
    }

    dismissProgressHUD() {
        this.setState({is_hud_visible: false});
    }

    constructor(props) {
        super(props);

        this.state = {
            is_hud_visible: false
        }

    }

    componentDidMount() {
        // Set rotation interval
        this.interval = setInterval(() => {
            this.setState({is_hud_visible: false});
        }, HUD_DURATION);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if(this.state.is_hud_visible) {
            return (
                <View style={HUDStyles.overlay}>
                    <View style={HUDStyles.container}>
                        <ActivityIndicator
                            animating={this.state.animating}
                            style={[HUDStyles.spinner, {height: 80}]}
                            size="large"
                            color="white"
                        />

                    </View>
                </View>
            );
        } else {
            return(<View/>);
        }

    }
}
const SPINNER_BG_WIDTH = 80;
const SPINNER_BG_HEIGHT = 80;
let {width, height} = Dimensions.get('window');

let HUDStyles = StyleSheet.create({

    overlay: {
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SPINNER_BG_WIDTH,
        height: SPINNER_BG_HEIGHT,
        borderRadius: 16,
        left: (width - SPINNER_BG_WIDTH)/2,
        top: (height - SPINNER_BG_HEIGHT)/2 - 64,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },

    spinner: {
        color:"white",
    },
});