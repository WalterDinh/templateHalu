/* eslint-disable react/no-array-index-key */
/* eslint-disable react/sort-comp */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, Image } from 'react-native';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import styleConstructor from './style';
import { weekDayNames } from '../../dateutils';
import { CHANGE_MONTH_LEFT_ARROW, CHANGE_MONTH_RIGHT_ARROW } from '../../testIDs';
import AppText from '../../../AppText';

const moment = require('moment');

class CalendarHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
    weekNumbers: PropTypes.bool,
    onPressArrowLeft: PropTypes.func,
    onPressArrowRight: PropTypes.func
  };

  static defaultProps = {
    monthFormat: 'MMMM yyyy'
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
    this.onPressLeft = this.onPressLeft.bind(this);
    this.onPressRight = this.onPressRight.bind(this);
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.month.toString('yyyy MM') !== this.props.month.toString('yyyy MM')) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    if (nextProps.hideDayNames !== this.props.hideDayNames) {
      return true;
    }
    return false;
  }

  onPressLeft() {
    const { onPressArrowLeft } = this.props;
    if (typeof onPressArrowLeft === 'function') {
      return onPressArrowLeft(this.substractMonth);
    }
    return this.substractMonth();
  }

  onPressRight() {
    const { onPressArrowRight } = this.props;
    if (typeof onPressArrowRight === 'function') {
      return onPressArrowRight(this.addMonth);
    }
    return this.addMonth();
  }

  onClickedMonth(index) {
    const { onMonthClicked } = this.props;
    if (onMonthClicked) {
      onMonthClicked(index);
    }
  }

  renderOtherMonth = (month, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onClickedMonth(index);
        }}
      >
        <AppText
          allowFontScaling={false}
          style={this.style.otherMonthText}
          accessibilityTraits="header"
          text={month}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const leftArrow = <View />;
    const rightArrow = <View />;
    const weekDaysNames = weekDayNames(this.props.firstDay);
    const currentString = this.props.month
      .toString()
      .substring(0, this.props.month.toString().length - 13);
    const year = moment(currentString).format('YYYY');
    const currentMonth = moment(currentString).format('MMM');
    const previousMonth = moment(currentString)
      .subtract(1, 'month')
      .format('MMM');
    const beforePreviousMonth = moment(currentString)
      .subtract(2, 'month')
      .format('MMM');
    const nextMonth = moment(currentString)
      .add(1, 'month')
      .format('MMM');
    const afterNextMonth = moment(currentString)
      .add(2, 'month')
      .format('MMM');

    let indicator;
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator />;
    }
    return (
      <View>
        <AppText
          allowFontScaling={false}
          style={this.style.yearText}
          accessibilityTraits="header"
          text={year.toUpperCase()}
        />
        <View style={this.style.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {this.renderOtherMonth(beforePreviousMonth, -2)}
            {this.renderOtherMonth(previousMonth, -1)}
            <AppText
              allowFontScaling={false}
              style={this.style.monthText}
              accessibilityTraits="header"
              text={currentMonth.toUpperCase()}
            />
            {this.renderOtherMonth(nextMonth, 1)}
            {this.renderOtherMonth(afterNextMonth, 2)}
          </View>
        </View>
        <View style={{ width: 300, height: 1, backgroundColor: 'rgb(58, 207, 213)' }} />
        {!this.props.hideDayNames && (
          <View style={this.style.week}>
            {this.props.weekNumbers && (
              <Text allowFontScaling={false} style={this.style.dayHeader} />
            )}
            {weekDaysNames.map((day, idx) => (
              <AppText
                allowFontScaling={false}
                key={idx}
                accessible={false}
                style={this.style.dayHeader}
                numberOfLines={1}
                importantForAccessibility="no"
                text={day.charAt(0)}
              />
            ))}
          </View>
        )}
      </View>
    );
  }
}

export default CalendarHeader;
