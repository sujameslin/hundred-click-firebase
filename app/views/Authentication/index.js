import React from 'react';
import {connect} from 'react-redux'

import {
  View,
  Text
} from 'react-native'

import appStyles from '../../styles/app';
import List from '../../components/List/List'

import Signin from './pages/Signin';
import Signup from './pages/Signup';

export const Routes = {
  'signin': {
    route: {
      title: 'Sign In',
      Component: Signin
    }
  },
  'signup': {
    route: {
      title: 'Create new User',
      Component: Signup
    }
  }
}

export class Authentication extends React.Component {
  render() {
    const initialRows = Object.keys(Routes).map(key => {
      const routeCfg = Routes[key];
      return { title: routeCfg.route.title, key: `auth.${key}` }
    })
    return (
      <View style={appStyles.container}>
        <List
          initialRows={initialRows}
          renderRow={this._renderRow.bind(this)}
          onRowPress={this._onRowPress.bind(this)}
          />
      </View>
    )
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    console.log(rowData)
    return (
      <View style={[appStyles.row]}>
        <Text>{rowData.title}</Text>
      </View>
    )
  }

  _onRowPress(rowData) {
    const rowKey = rowData.key;
    const {actions: { navigation }} = this.props;

    navigation.push(rowKey, this.props);
  }
}

const mapStateToProps = (state) => ({
  firestack: state.firestack
})
export default connect(mapStateToProps)(Authentication)
