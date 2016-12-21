import React, { PropTypes as T }  from 'react';

import {
  View,
  Text,
  NativeModules
} from 'react-native';

import { Container, Title, Content, List, ListItem, InputGroup, Input, Icon, Button } from 'native-base';

import SignedIn from '../components/SignedIn';
import appStyles from '../../../styles/app';

export class Signin extends React.Component {
  static propTypes = {
    firestack: T.object,
    actions: T.object
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: null,
      email: '',
      password: ''
    }
  }

  componentWillMount() {
    const { firestack } = this.props;

    firestack.auth.listenForAuth((u) => {
      console.log('listenForAuth ->', u);
    });

    firestack.auth.getCurrentUser()
      .then(user => {
        this.setState({ user });
      });
  }

  gotoSignup() {
    const {actions: { navigation }} = this.props;

    navigation.push('auth.signup', this.props);
  }

  loginWithEmail(evt) {
    const {firestack} = this.props;
    const { email, password } = this.state;

    firestack.auth.signInWithEmail(email, password)
      .then(u => {
        console.log('Signed in!', u);
        this.setState({
          user: u,
          email: '',
          password: ''
        });
      })
      .catch(err => {
        console.log('An error occurred', err);
      });
  }

  componentWillUnmount() {
    const {firestack} = this.props;
    firestack.auth.unlistenForAuth();
  }

  onSignout() {
    this.setState({
      user: null,
      email: '',
      password: ''
    });
  }

  render() {
    const {firestack} = this.props;
    const { user, email, password } = this.state;
    if (user) {
      return (
        <SignedIn
          user={user}
          firestack={firestack}
          onSignout={this.onSignout.bind(this)}
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
                info
                onPress={this.loginWithEmail.bind(this)}>
                  <Text>Sign in</Text>
              </Button>
            </ListItem>

            <ListItem>
              <Button
                block
                info
                onPress={this.gotoSignup.bind(this)}>
                  <Text>Go to signup if you're new</Text>
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

export default Signin;
