/**
 * Created by my_liu on 2017/2/7.
 */
'use strict';
import React, { Component } from 'react';
import {
    View,
    StatusBar,
    DeviceEventEmitter,
    AppState,
    StyleSheet,
    Platform,
} from 'react-native';

import codePush from 'react-native-code-push';
import {connect} from 'react-redux';
import LFProgressHUD from './components/basicComponent/common/LFProgressHUD';
import LFNotiEventConstants from './components/basicConfig/LFNotiEventConstants';
import LFNavigator from './components/basicComponent/LFNavigator';

class App extends React.Component {

    _onOpenActionSheet = () => {
        // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
        let options = ['Delete', 'Save', 'Cancel'];
        let destructiveButtonIndex = 0;
        let cancelButtonIndex = 2;
        this.props.showActionSheetWithOptions({
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
            },
            (buttonIndex) => {
                // Do something here depending on the button index selected
            });
    };


    componentDidMount = () => {
        AppState.addEventListener('change', this.handleAppStateChange);

        this.showHudEventListener = DeviceEventEmitter.addListener(LFNotiEventConstants.EventKeyShowHUD, () => {
            this.hud.showProgressHUD();
        });

        this.hideHudEventListener = DeviceEventEmitter.addListener(LFNotiEventConstants.EventKeyHideHUD, () => {
            this.hud.dismissProgressHUD();
        });
        // this.props.dispatch(loadConfig());

        //检查更新
        // this.checkUpdate();
    };

    componentWillUnmount = () => {
        AppState.removeEventListener('change', this.handleAppStateChange);
        this.showHudEventListener.remove();
        this.hideHudEventListener.remove();
    };

    checkUpdate = () => {
        if (Platform.OS === 'android') {
            codePush.sync({
                updateDialog: {
                    appendReleaseDescription: true,
                    descriptionPrefix: '\n\n',
                    title: '更新',
                    optionalIgnoreButtonLabel: '暂时忽略',
                    optionalInstallButtonLabel: '马上更新',
                    optionalUpdateMessage: '',
                    mandatoryUpdateMessage: '',
                    mandatoryContinueButtonLabel: '更新',
                },
                mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
                installMode: codePush.InstallMode.IMMEDIATE,
                deploymentKey: __DEV__ ? 'RGO1bUSRhF7JX-5XkIvtLvte_I2HV1sIMZj4f' : 'Z3iwK6fcCOIb2p4odFvmR96t5Q-OV1sIMZj4f',
            });
        } else {
            codePush.sync({
                updateDialog: {
                    appendReleaseDescription: true,
                    descriptionPrefix: '\n\n',
                    title: '更新',
                    optionalIgnoreButtonLabel: '暂时忽略',
                    optionalInstallButtonLabel: '马上更新',
                    optionalUpdateMessage: '',
                    mandatoryUpdateMessage: '',
                    mandatoryContinueButtonLabel: '更新',
                },
                mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
                installMode: codePush.InstallMode.IMMEDIATE,
                deploymentKey: __DEV__ ? 'XSPoyVKedM-RyGKXvrUADQ29HBACV1sIMZj4f' : 'ONEnR3zcTYfvwQ8ubMdHXfNNnydIV1sIMZj4f',
            });
        }
    };

    codePushStatusDidChange(status) {
        switch (status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for updates.");
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update.");
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                console.log("Up-to-date.");
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed.");
                break;
        }
    };

    codePushDownloadDidProgress(progress) {
        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    };

    handleAppStateChange = (appState) => {
        if (appState === 'active') {

        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    barStyle="default"
                />
                <LFNavigator />
                <LFProgressHUD ref={(o)=>{this.hud=o;}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

function select(store) {
    return {};
}

export default connect(select)(App);