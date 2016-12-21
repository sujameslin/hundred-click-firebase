import React from 'react'

import {
  View,
  NativeModules
} from 'react-native'

import { Container,
  Content, Card, CardItem,
  Thumbnail, Text,
  Button } from 'native-base';

import appStyles from '../../../styles/app';

export class SignedIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentWillMount() {
    const { firestack } = this.props;
  }

  goHome(evt) {
    const {firestack} = this.props;
    alert('go home clicked');
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  render() {
    const { user } = this.props;
    return (
      <Container>
        <Content>
           <Card>
              <CardItem >
                  <Text>You are signed in</Text>
                  <Text>{user.displayName}</Text>
              </CardItem>

              <CardItem cardBody>
                  <Text>

                  </Text>
                <Button
                  onPress={this.goHome.bind(this)}
                  block
                  primary
                  textStyle={{color: '#FFFFFF'}}>
                    <Text>Go to home</Text>
                </Button>
            </CardItem>
         </Card>
        </Content>
      </Container>
    )
  }

}

export default SignedIn
