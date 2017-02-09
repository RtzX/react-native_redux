/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';

const LOCATION_COLORS = {
    'HERBST': '#00E3AD',
    'HERBST A': '#00E3AD',
    'HERBST B': '#00E3AD',
    'HACKER X': '#4D99EF',
    'HACKER Y': '#CF72B1',
    'COWELL': '#6A6AD5',
    'COWELL C': '#6A6AD5',
    'FOOD TENT': '#FFCD3B',
};

function colorForLocation(location: ?string): string {
    if (!location) {
        return 'black';
    }

    var color = LOCATION_COLORS[location.toUpperCase()];
    if (!color) {
        console.warn(`Location '${location}' has no color`);
        color = 'black';
    }
    return color;
}

function colorForTopic(count: number, index: number): string {
    const hue = Math.round(360 * index / (count + 1));
    return `hsl(${hue}, 74%, 65%)`;
}

export default {
    actionText: '#3FB4CF',
    inactiveText: '#9B9B9B',
    darkText: '#032250',
    grayText: '#7b7b7b',
    lightText: '#7F91A7',
    orangeText: '#f26c25',
    cellBorder: '#EEEEEE',
    darkBackground: '#183E63',
    grayBackground: '#f4f4f4',
    goldBackground: '#FFB814',
    lineColor: 'silver',
    navBarColor: 'white',
    priceColor: '#CF0100',
    transparent: 'transparent',
    colorForLocation,
    colorForTopic,
};
