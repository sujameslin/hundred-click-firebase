import React from 'react';
import { View } from 'react-native'
import { Text, Button, Icon } from 'native-base';

export default class BoxList extends React.Component {
  onClick(key) {
    const { data, onUpdate } = this.props;
    const idx = data.indexOf(key);

    if (idx > -1) {
        data.splice(idx, 1);
    } else {
        data.push(key);
    }

    onUpdate(data);
  }

  getHundredBoxes(boxNumbers, data) {
    const boxes = [];

    for (var idx = 0; idx < boxNumbers; idx++) {
      const clicked = data.indexOf(idx) > -1;
      let style = {marginTop: 5, marginBottom: 5, marginRight: 1};

      if (clicked) {
        style = Object.assign(style, {backgroundColor: '#384850'});
      }

      boxes.push(
        <Button
          style={style}
          key={idx}
          onPress={this.onClick.bind(this, idx)}>
          { clicked
            ? <Icon name='ios-checkmark-circle-outline' />
            :  <Icon name='ios-close-circle-outline' /> }
        </Button>
      );
    }

    return boxes;
  }

  render() {
    const { boxNumbers, data } = this.props;

    return (
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {this.getHundredBoxes(boxNumbers, data)}
      </View>
    )
  }
}
