/**
 * Created by my_liu on 2017/2/8.
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import LFHeader from '../../components/basicComponent/common/LFHeader';
import LFColors from '../../components/basicConfig/LFColors';

export default class HomeContainer extends Component {
    static propTypes = {};

    render() {
        return (
            <View style={{backgroundColor:'#e34a45',flex:1}}>
                <LFHeader style={styles.header}
                           foreground="dark"
                           background={
                               LFColors.navBarColor
                           }
                           title="首页"
                />
                <Text>{'首页'}</Text>
            </View>
        )
    }
}


    let styles = StyleSheet.create({
        container: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: LFColors.grayBackground,

    },
        list: {
        flex: 1,
    },
        separator: {
        height: 0.5,
        backgroundColor: '#e0e0e0',
    },
        header: {
        // position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
    },

        row: {
        padding: 10,
        height: 44,
    },

    });
