import React from 'react';
import {connect} from 'react-redux'
import { ScrollView, Text } from 'react-native'

import BoxList from './components/BoxList';

import appStyles from '../../styles/app';

const firebaseRefBaseName = 'boxes';

export class HundredBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: [],
      user: null
    };
  }

  getFBRefName() {
    const { user } = this.state;

    return `${firebaseRefBaseName}/${user.uid}`;
  }

  updateData(data) {
    this.setState({
      clicks: data
    });

    this.pushToServer();
  }

  loadData() {
    const {firestack} = this.props;

    firestack.database.ref(this.getFBRefName())
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data && data.length) {
          this.setState({ clicks: data });
        }
      })
      .catch(() => {
        alert('fetch error');
      });
  }

  componentWillMount() {
    const {firestack} = this.props;

    firestack.auth.getCurrentUser()
      .then(data => {
        this.setState({ user: data.user });
        this.loadData();
      })
      .catch(err => console.log('not logged in'));
  }

  pushToServer() {
    const { firestack } = this.props;
    const { clicks } = this.state;
    firestack.database.ref(this.getFBRefName())
      .set(clicks)
      .catch(() => alert('error happend'));
  }

  render() {
    const { user } = this.state;

    return (
      <ScrollView>
        {
          user ?
            <BoxList
              boxNumbers={10}
              data={this.state.clicks}
              onUpdate={this.updateData.bind(this)}
            />
          :
            <Text>You should login first</Text>
        }

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  firestack: state.firestack
})
export default connect(mapStateToProps)(HundredBox)
