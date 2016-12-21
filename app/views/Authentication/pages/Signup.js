import React from 'react';

import {
  View,
  Text,
  NativeModules
} from 'react-native';

import { Container, Title, Content, List, ListItem, InputGroup, Input, Icon, Button } from 'native-base';

import SignedIn from '../components/SignedIn';
import appStyles from '../../../styles/app';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillMount() {
    const {firestack} = this.props;

    firestack.auth.listenForAuth((u) => {
      console.log('listenForAuth ->', u);
    });
  }

  goBackToLogin() {
    const {actions: { navigation }} = this.props;
    navigation.pop();
  }

  createUserWithEmail(evt) {
    const {firestack} = this.props;
    const { email, password } = this.state;

    firestack
      .auth
      .createUserWithEmail(email, password)
      .then(user => {
        console.log('Signed up!', user);
        this.setState({ user });
      })
      .catch(err => {
        alert('An error occurred');
        console.log('An error occurred', err);
      });
  }

  componentWillUnmount() {
    const {firestack} = this.props;
    firestack.auth.unlistenForAuth();
  }

  render() {
    const {firestack} = this.props;
    const { user, email, password } = this.state;
    if (user) {
      return (
        <SignedIn
          user={user}
          firestack={firestack}
        />
      )
    }
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name='ios-person' />
                <Input
                  placeholder='EMAIL'
                  value={email}
                  onChangeText={(text) => this.setState({email: text})}
                />
              </InputGroup>
            </ListItem>

            <ListItem>
              <InputGroup>
                <Icon name='ios-unlock' />
                <Input
                  placeholder='PASSWORD'
                  secureTextEntry={true}
                  value={password}

                  onChangeText={(text) => this.setState({password: text})}
                />
              </InputGroup>
            </ListItem>

            <ListItem>
              <Button
                block
                danger
                onPress={this.createUserWithEmail.bind(this)}>
                  <Text>Sign Up</Text>
              </Button>
            </ListItem>

            <ListItem>
              <Button
                block
                info
                onPress={this.goBackToLogin.bind(this)}>
                  <Text>Go back to signin if you already have account</Text>
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}
