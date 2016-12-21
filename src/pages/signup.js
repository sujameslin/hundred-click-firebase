import React, { Component, PropTypes } from 'react';

import {
    AppRegistry,
    Text,
    View,
    TextInput,
    TouchableHighlight
  } from 'react-native';
// import Firebase from 'firebase';

import Button from '../components/button';
import Header from '../components/header';
import styles from '../styles/common-styles.js';
import Login from './login';

// let app = new Firebase('hundredclick.firebaseio.com');

export default class signup extends Component {

  static propTypes = {
    navigator: PropTypes.object,
    firestack: PropTypes.object
  }

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup() {
    this.setState({
      loaded: false
    });

    // const {firestack} = this.props;
    // const { email, password } = this.state;
    // firestack
    //   .auth
    //   .createUserWithEmail(email, password)
    //   .then(user => {
    //     alert('account is created!');
    //     this.setState({
    //       email: '',
    //       password: '',
    //       loaded: true
    //     });
    //   })
    //   .catch(err => {
    //     alert('An error occurred:' + err.code);
    //     console.log('An error occurred', err);
    //   });
  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <Button
            text="Signup"
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text}
          />

          <Button
            text="Got an Account?"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text}
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);
