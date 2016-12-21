import React from 'react';
import {connect} from 'react-redux'

import {
  View,
  ScrollView
} from 'react-native'

import { Text, Button, Icon } from 'native-base';

import appStyles from '../../styles/app';

const firebaseRefName = 'clicks';

export class HundredBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicks: []
    };
  }

  updateData(key) {
    const idx = this.state.clicks.indexOf(key);

    if (idx > -1) {
      this.state.clicks.splice(idx, 1);
    } else {
      this.state.clicks.push(key)
    }

    this.setState({
      clicks: this.state.clicks
    });
  }

  componentWillMount() {
    const {firestack} = this.props;
    const ref = firestack.database.ref(firebaseRefName)

    ref
    .orderByChild('createdAt')
    .limitToLast(1)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      for (last in data);
      this.setState({ clicks: data[last] });
    })
    .catch(() => {
      alert('fetch error');
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.pushToServer();
    }
  }

  pushToServer() {
    const { firestack } = this.props;
    const { clicks } = this.state;
    firestack.database.ref(firebaseRefName)
      .push()
      .then(ref => ref.setAt(clicks))
      .catch(() => alert('error happend'));
  }

  getHundredBoxes() {
    const boxes = [];
    const { clicks } = this.state;

    for (var idx = 0; idx < 15; idx++) {
      const clicked = clicks.indexOf(idx) > -1;
      let style = {marginTop: 5, marginBottom: 5, marginRight: 1};

      if (clicked) {
        style = Object.assign(style, {backgroundColor: '#384850'});
      }

      boxes.push(
        <Button
          style={style}
          key={idx}
          onPress={this.updateData.bind(this, idx)}>
          { clicked
            ? <Icon name='ios-checkmark-circle-outline' />
            :  <Icon name='ios-close-circle-outline' /> }
        </Button>
      );
    }

    return boxes;
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {this.getHundredBoxes()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  firestack: state.firestack
})
export default connect(mapStateToProps)(HundredBox)
