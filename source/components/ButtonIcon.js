import { TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors, Consts, Styles } from 'utilities';

export default class ButtonIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { source } = this.props;
    return (
      <TouchableOpacity {...this.props} style={styles.container}>
        <Image style={styles.img} source={source} />
      </TouchableOpacity>
    );
  }
}

let styles = {
  container: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
};
