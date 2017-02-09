/**
 * Created by my_liu on 2017/2/8.
 */
'use strict';

import React from 'react';
import ReactNative from 'react-native';
import LFColors from '../../basicConfig/LFColors';
import { Text } from '../../basicConfig/LFText';
import * as UIConstants from '../../basicConfig/LFUIConstants';

const {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
    ToolbarAndroid,
} = ReactNative;

export type Layout =
    'default'      // Use platform defaults (icon on Android, text on iOS)
    | 'icon'         // Always use icon
    | 'title'       // Always use title
    | 'city'        // Select city

export type Foreground = 'light' | 'dark';

export type Item = {
    title?: string;
icon?: number;
layout?: Layout;
onPress?: () => void;
};

export type Props = {
    title?: string;
leftItem?: Item;
rightItem?: Item;
extraItems?: Array<Item>;
foreground?: Foreground;
background?: string;
style?: any;
children?: any;
};

class LFHeaderAndroid extends React.Component {
    static height: number;
    props: Props;

    render() {
        const {leftItem, rightItem, extraItems} = this.props;
        let actions = [];
        if (leftItem) {
            const {title, icon, layout} = leftItem;
            // showWithText = layout === 'city'? true : false;
            actions.push({
                icon: layout !== 'title' ? icon : undefined,
                title: title,
                show: 'always',
                // showWithText: showWithText,
            });
        }
        if (rightItem) {
            const {title, icon, layout} = rightItem;
            actions.push({
                icon: layout !== 'title' ? icon : undefined,
                title: title,
                show: 'always',
            });
        }
        if (extraItems) {
            actions = actions.concat(extraItems.map((item) => ({
                title: item.title,
                show: 'never',
            })));
        }

        const textColor = this.props.foreground === 'dark'
            ? LFColors.darkText
            : 'white';

        const backgroundColor = this.props.background === 'dark'
            ? LFColors.navBarColor
            : 'white';

        let content;
        if (React.Children.count(this.props.children) > 0) {
            content = (
                <View collapsable={false} style={{flex: 1}}>
                    {this.props.children}
                </View>
            );
        }

        return (
            <View style={[styles.toolbarContainer, this.props.style]}>
                <ToolbarAndroid
                    navIcon={leftItem && leftItem.icon}
                    onIconClicked={leftItem && leftItem.onPress}
                    title={this.props.title}
                    titleColor={textColor}
                    subtitleColor={textColor}
                    actions={actions}
                    onActionSelected={this.handleActionSelected.bind(this)}
                    style={styles.toolbar}>
                    {content}
                </ToolbarAndroid>
            </View>
        );
    }

    handleActionSelected(position: number) {
        let items = this.props.extraItems || [];
        if (this.props.rightItem) {
            items = [this.props.rightItem, ...items];
        }
        const item = items[position];
        item && item.onPress && item.onPress();
    }
}

class LFHeaderIOS extends React.Component {
    static height: number;
    props: Props;

    render() {
        const {leftItem, title, rightItem, foreground, background} = this.props;
        const titleColor = foreground === 'dark' ? LFColors.grayText : 'white';
        const itemsColor = foreground === 'dark' ? LFColors.lightText : 'white';
        const backgroundColor = background === '' ? 'white':background;
        const content = React.Children.count(this.props.children) === 0
            ? <Text style={[styles.titleText, {color: titleColor}]}
                    numberOfLines={1}
            >
                {title}
            </Text>
            : this.props.children;
        return (
            <View style={[styles.header, this.props.style, {backgroundColor: backgroundColor,borderBottomColor:UIConstants.LineColor,borderBottomWidth:0.5}]}>
                <View style={styles.leftItem}>
                    <ItemWrapperIOS color={itemsColor} item={leftItem} />
                </View>
                <View
                    accessible={true}
                    accessibilityLabel={title}
                    accessibilityTraits="header"
                    style={styles.centerItem}>
                    {content}
                </View>
                <View style={styles.rightItem}>
                    <ItemWrapperIOS color={itemsColor} item={rightItem} />
                </View>
            </View>
        );
    }

}

class ItemWrapperIOS extends React.Component {
    props: {
        item: Item;
        color: string;
    };

    render() {
        const {item, color} = this.props;
        if (!item) {
            return null;
        }

        let content;
        const {title, icon, layout, onPress} = item;

        if (layout === 'title' && title) {
            content = (
                <Text style={[styles.itemText, {color}]}>
                    {title.toUpperCase()}
                </Text>
            );
        } else if (layout === 'icon') {
            if (icon) {
                content = <Image source={icon} />;
            } else {
                content = <Image source={require('../image/back.png')}/>
            }

        } else if (layout === 'city') {
            content = (
                <View style={styles.itemWrapperView}>
                    <Text style={[styles.itemText, {color}]}>
                        {title.toUpperCase()}
                    </Text>
                    <Image source={icon} />
                </View>
            );
        }

        return (
            <TouchableOpacity
                accessibilityLabel={title}
                accessibilityTraits="button"
                onPress={onPress}
                style={styles.itemWrapper}>
                {content}
            </TouchableOpacity>
        );
    }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
    toolbarContainer: {
        paddingTop: STATUS_BAR_HEIGHT,
    },
    toolbar: {
        height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    },
    header: {
        backgroundColor: 'transparent',
        paddingTop: STATUS_BAR_HEIGHT,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    leftItem: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerItem: {
        flex: 2,
        alignItems: 'center',
    },
    rightItem: {
        flex: 1,
        alignItems: 'flex-end',
    },
    itemWrapper: {
        padding: 11,
    },
    itemWrapperView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        letterSpacing: 1,
        fontSize: 14,
        color: 'white',
    },
});

// const Header = Platform.OS === 'ios' ? LFHeaderIOS : LFHeaderAndroid;
const Header =  LFHeaderIOS;

Header.height = HEADER_HEIGHT;
Header.statusBarHieght = STATUS_BAR_HEIGHT;
// $FlowFixMe
Header.__cards__ = (define) => {
    const menuItem = {
        title: 'Menu',
        icon: require('../image/hamburger.png'),
        onPress: () => alert('Menu button pressed!'),
    };
    const filterItem = {
        title: 'Filter',
        icon: require('../image/filter.png'),
        onPress: () => alert('Filter button pressed!'),
    };

    define('Simple', () => <Header title="Hello, world" />);
    define('With items', () => (
        <Header
            title="Default"
            leftItem={menuItem}
            rightItem={filterItem}
        />
    ));
    define('Forcing icons', () => (
        <Header
            title="Forcing icons"
            leftItem={{...menuItem, layout: 'icon'}}
            rightItem={{...filterItem, layout: 'icon'}}
        />
    ));
    define('Forcing title', () => (
        <Header
            title="Forcing title"
            leftItem={{...menuItem, layout: 'title'}}
            rightItem={{...filterItem, layout: 'title'}}
        />
    ));
    define('With content', () => (
        <Header leftItem={menuItem}>
            <View style={{backgroundColor: '#224488'}}>
                <Text style={{color: 'yellow'}}>
                    Yellow text as title
                </Text>
            </View>
        </Header>
    ));
    define('With Background', () => (
        <Header
            title="With Background"
            leftItem={{...menuItem, layout: 'title'}}
            rightItem={{...filterItem, layout: 'title'}}
            style={{backgroundColor: '#224488'}}
        />
    ));
    define('With light background', () => (
        <Header
            title="Light Background"
            leftItem={{...menuItem, layout: 'title'}}
            rightItem={{...filterItem, layout: 'title'}}
            style={{backgroundColor: 'white'}}
            foreground="dark"
        />
    ));
};

module.exports = Header;