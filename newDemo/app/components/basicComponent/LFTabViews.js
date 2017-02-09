/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Navigator,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import LFColors from '../basicConfig/LFColors';
import { connect } from 'react-redux';
import { switchTab } from '../../reducers/app/tabActions';
import HomeContainer from '../../containers/home/HomeContainer';
import ProfileContainer from '../../containers/profile/ProfileContainer';
import AppInstance from '../../utils/AppInstance';

class LFTabViews extends Component {

    static propTypes = {
        tab: React.PropTypes.string,
        onTabSelect: React.PropTypes.func,
        navigator: Navigator,
    };

    constructor(props) {
        super(props);
        this._renderBage = this._renderBage.bind(this);
    }

    componentDidMount(){
        AppInstance.shareInstance().tab = this;
    }

    onTabSelect(tab: Tab) {

        // if (tab == 'member') {
        //     AppInstance.shareInstance().needLogin(() => {
        //         this.props.dispatch(switchTab('member'));
        //     });
        // } else {
        //     if (this.props.tab !== tab) {
        //         this.props.onTabSelect(tab);
        //     }
        // }
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    render() {

        return (
            <TabNavigator configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
                          ref="tab"
            >
                <TabNavigator.Item
                    selected={this.props.tab === 'home'}
                    title="首页"
                    titleStyle={styles.tabTitle}
                    selectedTitleStyle={styles.tabSelecedTitle}
                    renderIcon={() => <Image source={require('../../containers/home/image/tabbar_message_normal.png')}/>}
                    renderSelectedIcon={() => <Image source={require('../../containers/home/image/tabbar_message_selected.png')}/>}
                    badgeText=""
                    onPress={this.onTabSelect.bind(this, 'home')}>
                    <HomeContainer
                        navigator={this.props.navigator}
                        tab={this.refs.tabNavigator}
                    />
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.props.tab === 'profile'}
                    title="我的"
                    titleStyle={styles.tabTitle}
                    selectedTitleStyle={styles.tabSelecedTitle}
                    renderIcon={() => <Image source={require('../../containers/profile/image/tabbar_mine_normal.png')}/>}
                    renderSelectedIcon={() => <Image source={require('../../containers/profile/image/tabbar_mine_selected.png')}/>}
                    badgeText=""
                    onPress={this.onTabSelect.bind(this, 'profile')}>
                    <ProfileContainer
                        navigator={this.props.navigator}
                    />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }

    _renderBage() {

    }

}

const styles = StyleSheet.create({

    tabTitle: {
        bottom: 3,
    },

    tabSelecedTitle: {
        color: LFColors.orangeText,
    }
});

function select(store) {
    return {
        tab: store.tab.tab,
    };
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab)),
        dispatch
    };
}

// module.exports = connect(select, actions)(LFTabViews);
export default connect(select, actions)(LFTabViews);