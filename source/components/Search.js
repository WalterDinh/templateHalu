import React from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { Consts, Colors, Styles } from 'utilities';
import { Icon } from 'react-native-elements';
import { Helper } from 'helper/index';
import AppText from './AppText';
import ArilTouchAble from './ArilTouchAble';

const _ = require('lodash');

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      filteredData: []
    };
  }

  componentDidMount() {
    const { onRef } = this.props;
    if (onRef != null) {
      onRef(this);
    }
  }

  onSearch(searchText) {
    const { data } = this.props;
    const filteredData = _.filter(data, item => {
      return Helper.removeDiacritics(item.name.toLowerCase().trim()).includes(
        Helper.removeDiacritics(searchText.toLowerCase().trim())
      );
    });
    this.setState({ searchText, filteredData: _.take(filteredData, 3) });
  }

  onChoseItem(item) {
    const { onChoseItem } = this.props;
    if (onChoseItem) {
      onChoseItem(item);
    }
  }

  clear() {
    this.setState({ searchText: '' });
  }

  renderItem = ({ item, index }) => {
    return (
      <ArilTouchAble
        onPress={() => {
          this.onChoseItem(item);
        }}
        style={styles.containerItem}
      >
        <Icon color="gray" name="search" />
        <AppText text={item.name} style={styles.itemTitle} />
      </ArilTouchAble>
    );
  };

  renderResultList() {
    const { filteredData } = this.state;
    return (
      <View style={[styles.listContainer, Styles.ViewStyle.shadowStyle]}>
        <FlatList
          style={{ width: '100%' }}
          renderItem={this.renderItem}
          data={filteredData}
          scrollEnabled={false}
          extraData={this.state}
        />
      </View>
    );
  }

  render() {
    const { style, isShadow } = this.props;
    const { searchText, filteredData } = this.state;
    const showResult = !_.isEmpty(filteredData) && !_.isEmpty(searchText);
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.inputContainer, isShadow ? Styles.ViewStyle.shadowStyle : null]}>
          <Icon name="search" />
          <TextInput
            autoCorrect={false}
            value={searchText}
            onChangeText={text => {
              this.onSearch(text);
            }}
            style={styles.input}
            allowFontScaling={false}
          />
        </View>
        {showResult ? this.renderResultList() : null}
      </View>
    );
  }
}

const styles = {
  container: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  listContainer: {
    width: '90%',
    borderRadius: 42 / 2,
    marginTop: 10,
    paddingTop: 6,
    backgroundColor: 'white'
  },
  containerItem: {
    flexDirection: 'row',
    padding: 8,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start'
  },
  itemTitle: {
    color: 'black',
    fontSize: Consts.FONT_SIZE.BUTTON
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: '100%'
  },
  inputContainer: {
    width: '88%',
    alignItems: 'center',
    height: 40,
    borderRadius: 35 / 2,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 8
  },
  textInput: {
    position: 'absolute',
    left: 0
  }
};
