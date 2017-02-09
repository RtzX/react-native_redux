/**
 * Created by my_liu on 2017/2/8.
 */
'use strict';
import React from 'react';
import ReactNative from 'react-native';
const {
    Dimensions,
} = ReactNative;

const scale = Dimensions.get('window').width / 375;
let {height, width} = Dimensions.get('window');

function normalize(size: number): number {
    return Math.floor(scale * size);
}

export default {
    // 布局
    Margin: normalize(15),
    MarginLeft: normalize(15), // 左外边距
    MarginRight: normalize(15), // 右外边距
    ContentWidth: width - normalize(30),

    // 颜色
    ImageBackgroundColor: '#e4e4ea', // 图片占位颜色
    LineColor: '#d2d2d2',
    YellowColor: '#ffd200',
    OrangeColor: '#fc9e3c',
    ContentColor: '#000100',  // 内容字体颜色
    SubTitleColor: '#c2c2c2', //副标题颜色，如时间、浏览量等
    NormalTextColor: '#4c4c4c',
    TouchColor: '#c2c2c2', // 点击组件时的颜色
    normalize: normalize,
};