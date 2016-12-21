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

//import Firestack from 'react-native-firestack';
import env from './config/environment';

import styles from './src/styles/common-styles.js';

export default class HundredClickFirebase extends Component {
  constructor(props){
    super(props);

    // this.firestack = new Firestack(env.firestack);
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
              return React
                .createElement(route.component, {
                  navigator: navigator
                });
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
