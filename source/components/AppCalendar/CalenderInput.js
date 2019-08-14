import { View, Dimensions, Modal } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import { Colors, Consts, Styles } from 'utilities/index';
import { Button } from 'components/index';
import AppText from '../AppText';
import ArilTouchAble from '../ArilTouchAble';
import AppCalendar from './AppCalendar';

const moment = require('moment');
const _ = require('lodash');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class CalendarInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      unAvailableDays: [],
      isModalVisible: false
    };
  }

  // componentDidUpdate() {
  //   this.renderModal();
  // }

  onChooseDay = (date, isAvailable) => {
    const { onDone, availableDays, edit } = this.props;
    const dateString = moment.unix(date).format('DD/MM/YYYY');
    this.setState({ date: dateString, isModalVisible: !!edit }, () => {
      if (onDone) {
        onDone(date, isAvailable);
      }
    });
  };

  onSave() {
    const { onSave, isPrivate } = this.props;
    const { unAvailableDays } = this.state;
    if (isPrivate && onSave){
      const days =  this.calendar.getUnavailableDate();
      onSave(days)
      return;
    }
    if (onSave) {
      onSave(unAvailableDays);
    }
    this.setState({ isModalVisible: false });
  }

  renderModal = edit => {
    const { isModalVisible } = this.state;
    return (
      <Modal transparent visible={isModalVisible} style={styles.modal}>
        <ArilTouchAble
          activeOpacity={1}
          onPress={() => {
            // this.calendar.onRefresh();
            setTimeout(() => {
              this.setState({ isModalVisible: false });
            }, 300);
          }}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItem: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >
          <AppCalendar
            isMutiple
            onReset={() => {
              this.setState({ isModalVisible: false });
            }}
            onPressMutiple={unAvailableDays => this.setState({ unAvailableDays })}
            onDayPress={(date, isAvailable) => this.onChooseDay(date, isAvailable)}
            // unAvailableDays={this.convertUnavailableDays(getUnavailableDays)}
            onRef={ref => {
              this.calendar = ref;
            }}
            {...this.props}
          />
          {edit ? (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginStart: 5,
                fontWeight: 'bold'
              }}
            >
              <AppText text="Uncheck the days you don't want to teach" style={{ color: 'white' }} />
              <Button
                title="Save calender"
                isShadow
                style={{ width: '40%', marginTop: 5 }}
                onPress={() => this.onSave()}
              />
            </View>
          ) : null}
        </ArilTouchAble>
      </Modal>
    );
  };

  // eslint-disable-next-line react/sort-comp
  componentDidUpdate() {
    this.render();
  }

  render() {
    const { style, disabled, value, edit, unAvailableDays } = this.props;
    const { date } = this.state;
    return (
      <ArilTouchAble
        disabled={disabled}
        onPress={() => {
          this.setState({ isModalVisible: true });
        }}
        style={[styles.containerStyle, Styles.ViewStyle.shadowStyle, style]}
      >
        <AppText text={value || date} style={styles.title} />
        <Icon
          containerStyle={{ position: 'absolute', right: 8 }}
          type="ionicon"
          color={Colors.MAIN_COLOR}
          name="md-calendar"
        />
        {this.renderModal(edit)}
      </ArilTouchAble>
    );
  }
}

let styles = {
  containerStyle: {
    marginTop: 8,
    padding: 8,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 12
  },
  modal: {
    position: 'absolute',
    top: -18,
    bottom: 0,
    left: -18,
    right: 0,
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontSize: Consts.FONT_SIZE.BODY,
    fontWeight: '500'
  }
};
