/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import Signup from './src/pages/signup';
import Account from './src/pages/account';

import Header from './src/components/header';

// import Firebase from 'firebase';

// let app = new Firebase('hundredclick.firebaseio.com');

import styles from './src/styles/common-styles.js';

export default class HundredClickFirebase extends Component {
  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }

  componentWillMount(){

    AsyncStorage
      .getItem('user_data')
      .then((user_data_json) => {

      let user_data = JSON.parse(user_data_json);
      let component = { component: Signup };
      if(user_data != null){
        // app.authWithCustomToken(user_data.token, (error, authData) => {
        //   if(error){
        //     this.setState(component);
        //   } else {
        //     this.setState({ component: Account });
        //   }
        // });
        alert('hey');
      } else {
        this.setState(component);
      }
    });

  }

  render() {

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('HundredClickFirebase', () => HundredClickFirebase);
