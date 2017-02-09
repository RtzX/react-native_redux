/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';

import React from 'react';
import ReactNative, {StyleSheet, Dimensions} from 'react-native';
import LFColors from './LFColors'
import environmentConfig from '../../netServer/environmentConfig';

export function Text({style, ...props}: Object): ReactElement {
    return <ReactNative.Text style={[textStyles.font, style]} {...props} />;
}

export function Heading1({style, ...props}: Object): ReactElement {
    return <ReactNative.Text style={[textStyles.font, styles.h1, style]} {...props} />;
}

export function Paragraph({style, ...props}: Object): ReactElement {
    return <ReactNative.Text style={[textStyles.font, styles.p, style]} {...props} />;
}

const scale = Dimensions.get('window').width / 375;

function normalize(size: number): number {
    return Math.round(scale * size);
}

const textStyles = StyleSheet.create({
    font: {
        fontFamily: environmentConfig.fontFamily,
    },
    h1: {
        fontSize: normalize(24),
        lineHeight: normalize(27),
        color: LFColors.darkText,
        fontWeight: 'bold',
        letterSpacing: -1,
    },
    p: {
        fontSize: normalize(15),
        lineHeight: normalize(23),
        color: LFColors.lightText,
    },
});