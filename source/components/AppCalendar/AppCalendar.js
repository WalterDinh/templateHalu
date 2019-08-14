/* eslint-disable react/destructuring-assignment */
import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Consts, Styles } from 'utilities';
import CalendarList from './calendar-list';
import AppText from '../AppText';
import ArilTouchAble from '../ArilTouchAble';

const moment = require('moment');
const _ = require('lodash');

export default class AppCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayChange: null,
      availableDays: props.availableDays ? props.availableDays : [],
      unAvailableDays: props.unAvailableDays ? Array.from(props.unAvailableDays) : []
    };
  }

  // componentDidUpdate() {
  //   this.render();
  //   console.log( 'componet Did update' )
  // }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(null);
    }
  }

  // eslint-disable-next-line consistent-return
  onChooseDay(date, isAvailable) {
    const { availableDays, disabled } = this.state;
    const { onDayPress, onPressMutiple, isMutiple, isChooseUnavailable } = this.props;
    const datString = this.getStringFromCalendarDay(date);
    const today = moment().format('DD/MM/YYYY');
    const todayUnix = moment(today, 'DD/MM/YYYY').unix();
    const dateUnix = moment(datString, 'DD/MM/YYYY').unix();
    const unAvailableDays = Array.from(this.state.unAvailableDays);
    if (disabled) {
      return null;
    }
    if (dateUnix < todayUnix) {
      return;
    }
    // availableDays.push(this.getStringFromCalendarDay(date));
    // this.setState({ availableDays });
    if (isChooseUnavailable && isAvailable) {
      unAvailableDays.push(this.getStringFromCalendarDay(date));
      this.setState({ unAvailableDays, dayChange: date });
      return;
    }
    if (isMutiple && isAvailable) {
      unAvailableDays.push(this.getStringFromCalendarDay(date));
      this.setState({ unAvailableDays });
      onPressMutiple(unAvailableDays);
    }
    if (onDayPress) {
      onDayPress(this.getStringFromCalendarDay(date), !isAvailable);
    }
  }

  onRefresh() {
    this.setState({ unAvailableDays: this.props.unAvailableDays });
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  getUnavailableDate() {
    if (this.props.onReset) {
      this.props.onReset();
    }
    return this.state.unAvailableDays;
  }

  getStringFromCalendarDay = date => moment(date.dateString, 'YYYY-MM-DD').format('DD/MM/YYYY');

  renderDay = ({ date, state }) => {
    const { availableDays, availableDayIndexes, startDate, isPrivate } = this.props;
    const { dayBusy, unAvailableDays } = this.state;
    const isAvailable = _.includes(availableDays, this.getStringFromCalendarDay(date));
    const stateDateStamp = moment(startDate, 'YYYY-MM-DD').format('x');
    let dayIndex = moment(date.dateString, 'YYYY-MM-DD').format('d');
    // dayIndex = parseInt(date.datString.format('d')) - 1;
    if (dayIndex === -1) {
      dayIndex = 6;
    }
    if (isPrivate) {
      const isUnAvailableDays = _.includes(unAvailableDays, this.getStringFromCalendarDay(date));
      // console.log('isUnAvailableDays', unAvailableDays, this.getStringFromCalendarDay(date));
      if (isUnAvailableDays) {
        // console.log('isUnAvailableDays', isUnAvailableDays);
        return this.renderAvailableDayBusy({ date, state });
      }
    }

    // if (_.includes(availableDayIndexes, dayIndex)) {
    if (availableDayIndexes && !isAvailable) {
      for (let i = 0; i < availableDayIndexes.length; i++) {
        if (availableDayIndexes[i] == dayIndex && date.timestamp >= stateDateStamp) {
          return this.renderAvailableDay({ date, state });
        }
      }
    }
    // availableDayIndexes.map(n => {
    //   console.log('indexx NNN', n, dayIndex);
    //   if (n == dayIndex && date.timestamp >= stateDateStamp) {
    //     console.log('aaaaaaaaaaaaaaattttttttttttttttttt')
    //     return this.renderAvailableDay({ date, state });
    //   }
    // });
    // console.log('availableDays', availableDays, this.getStringFromCalendarDay(date), isAvailable);
    if (isAvailable) {
      return this.renderAvailableDay({ date, state });
    }

    const isUnAvailableDays = _.includes(unAvailableDays, this.getStringFromCalendarDay(date));
    // console.log('isUnAvailableDays', unAvailableDays, this.getStringFromCalendarDay(date));
    if (isUnAvailableDays) {
      // console.log('isUnAvailableDays', isUnAvailableDays);
      return this.renderAvailableDayBusy({ date, state });
    }

    // if (dayBusy) {
    //   dayBusy.map(n => {
    //     if (n == this.getStringFromCalendarDay(date)) {
    //       return this.renderAvailableDayBusy({ date, state });
    //     }
    //   });
    // }

    return this.renderBasicDay({ date, state, isUnAvailableDays });
  };

  renderAvailableDay = ({ date, state }) => (
    <ArilTouchAble
      style={[styles.base, { backgroundColor: Colors.MAIN_COLOR }]}
      onPress={() => this.onChooseDay(date, true)}
    >
      <AppText
        text={date.day}
        allowFontScaling={false}
        style={[styles.dayTextStyle, { color: 'white' }]}
      />
    </ArilTouchAble>
  );

  renderAvailableDayBusy = ({ date, state }) => (
    <ArilTouchAble style={styles.base} onPress={() => this.onChooseDay(date, true)}>
      <AppText
        text={date.day}
        allowFontScaling={false}
        style={[
          styles.dayTextStyle,
          {
            color: 'black',
            textDecorationLine: 'line-through'
          }
        ]}
      />
    </ArilTouchAble>
  );

  renderBasicDay = ({ date, state, isUnAvailableDays }) => (
    <ArilTouchAble
      onPress={() => this.onChooseDay(date)}
      disabled={isUnAvailableDays}
      style={styles.base}
    >
      <AppText
        text={date.day}
        allowFontScaling={false}
        style={[
          styles.dayTextStyle,
          {
            textDecorationLine: isUnAvailableDays ? 'line-through' : 'none'
          }
        ]}
      />
    </ArilTouchAble>
  );

  render() {
    const { style, title, titleStyle, isShadow, icon, iconStyle, iconColor, color } = this.props;
    const { dayChange } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.containerStyle, Styles.ViewStyle.shadowCalendarStyle]}
      >
        <CalendarList
          // Specify style for calendar container element. Default = {}
          {...this.props}
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          hideExtraDays
          style={{
            borderRadius: 10,
            height: 335,
            width: 300
          }}
          dayComponent={({ date, state }) => this.renderDay({ date, state })}
          horizontal
          dayChange={dayChange}
          pagingEnabled
          calendarWidth={300}
          calendarHeight={335}
          updateRef={ref => (this.calendarRef = ref)}
          theme={{
            // backgroundColor: 'red',
            // calendarBackground: 'red',
            // textSectionTitleColor: '#b6c1cd',
            // selectedDayBackgroundColor: '#00adf5',
            // selectedDayTextColor: '#ffffff',
            todayTextColor: 'Colors.MAIN_COLOR'
            // dayTextColor: '#2d4150',
            // textDisabledColor: '#d9e1e8',
            // dotColor: '#00adf5',
            // selectedDotColor: '#ffffff',
            // arrowColor: Colors.MAIN_COLOR,
            // monthTextColor: 'blue',
            // textMonthFontWeight: 'bold',
            // textDayFontSize: 16,
            // textMonthFontSize: 16,
            // textDayHeaderFontSize: 16
          }}
        />
      </TouchableOpacity>
    );
  }
}

let styles = {
  containerStyle: {
    margin: 8,
    height: 335,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  dayTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  availableDay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.MAIN_COLOR,
    width: 32,
    height: 32,
    borderRadius: 15
  },
  availableDay2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16
  },
  base: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: Consts.FONT_SIZE.BUTTON
  }
};
