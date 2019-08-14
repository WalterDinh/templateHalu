import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Consts, Styles } from 'utilities/index';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';
import Carousel from 'react-native-snap-carousel';
import { backgroundColor } from 'components/AppCalendar/style';
import AppText from './AppText';

const months = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`, `09`, `10`, `11`, `12`];
const minYear = 1930;
const firstYear = 1930;
const maxYear = parseInt(moment().get('year'));
const yearsList = createYearRange();

function createYearRange() {
  const yearArr = [];
  for (let i = firstYear; i <= maxYear; i++) {
    yearArr.push(i);
  }
  return yearArr;
}

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      currentYear: moment().get('year'),
      currentMonth: moment().get('month'),
      currentDay: moment().get('date'),
      daysInMonth: moment().daysInMonth(),
      years: yearsList,
      indexs: {
        dayIndex: parseInt(moment().get('date')) - 1,
        monthIndex: moment().get('month'),
        yearIndex: yearsList.length - 1
      }
    };
  }

  onChange() {
    const { indexs, years } = this.state;
    const { onChangeDate } = this.props;
    let date = ``;
    const currentYear = years[indexs.yearIndex];
    const currentMonth = months[indexs.monthIndex];
    const daysInMonth = moment(`${currentYear}-${currentMonth + 1}`, 'YYYY-M').daysInMonth();
    const days = this.getDays(daysInMonth);
    const currentDate = days[indexs.dayIndex];
    date = `${currentDate}-${currentMonth}-${currentYear}`;
    // alert(
    //   JSON.stringify(date)
    // );
    if (onChangeDate) {
      onChangeDate(date);
    }
  }

  onChangeDay(index) {
    const { date, currentDay, currentYear, currentMonth, indexs, years } = this.state;
    const day = moment().format('DD');
    console.log('DAY', day);
    if (
      parseInt(currentYear) === parseInt(years[indexs.yearIndex]) &&
      indexs.monthIndex === parseInt(currentMonth) &&
      index > parseInt(day) - 1
    ) {
      this.setState(
        {
          indexs: { ...indexs, dayIndex: parseInt(day) - 1 }
        },
        () => {
          this.onChange();
          this.day.snapToItem(parseInt(day) - 1, true);
        }
      );
      return;
    }

    this.setState(
      {
        indexs: { ...indexs, dayIndex: index }
      },
      () => {
        this.onChange();
      }
    );
  }

  onChangeMonth(index) {
    const { date, currentDay, currentYear, years, currentMonth, indexs } = this.state;
    if (
      parseInt(currentYear) === parseInt(years[indexs.yearIndex]) &&
      index > parseInt(currentMonth)
    ) {
      this.setState(
        {
          indexs: {
            ...indexs,
            monthIndex: currentMonth
          }
        }
      );
      setTimeout(() => {
        this.onChange();
        this.month.snapToItem(currentMonth, true);
      },500)
      return;
    }
    const daysInMonth = moment(`${years[indexs.yearIndex]}-${index + 1}`, 'YYYY-M').daysInMonth();
    this.setState(
      {
        indexs: {
          ...indexs,
          monthIndex: index,
          dayIndex: indexs.dayIndex >= daysInMonth - 1 ? indexs.dayIndex - 1 : indexs.dayIndex
        },
        daysInMonth
      });
      setTimeout(() => {
        this.onChange();
        if (indexs.dayIndex >= daysInMonth - 1) {
          this.day.snapToItem(indexs.dayIndex - 1, true);
        }
      },500)        

  }

  onChangeYear(index) {
    const { date, currentDay, currentYear, currentMonth, indexs, years } = this.state;
    const daysInMonth = moment(`${years[index]}-${currentMonth + 1}`, 'YYYY-M').daysInMonth();
    let newYears = years;
    if (index == 0) {
      const addMoreYearArr = [];
      for (let i = 20; i >= 1; i--) {
        addMoreYearArr.push(years[index] - i);
      }
      newYears = _.union(addMoreYearArr, years);
      this.setState(
        {
          indexs: { ...indexs, yearIndex: 20 },
          daysInMonth,
          years: newYears
        },
      )
        setTimeout(() => {
          this.onChange();
          this.year.snapToItem(20, false);
        },500)
      return;
    }
    this.setState(
      {
        indexs: { ...indexs, yearIndex: index },
        daysInMonth,
        years: newYears
      }
    );
    setTimeout(() => {
      this.onChange();
    },500)
    return
  }

  getDays = daysInMonth => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      if (i < 10) {
        days.push(`0${i}`);
      } else {
        days.push(`${i}`);
      }
    }
    return days;
  };

  renderItem = (item, index, indexName) => {
    const { indexs } = this.state;
    if (indexs[indexName] === index) {
      return (
        <View style={styles.selectedSlide}>
          <AppText text={item} style={styles.selectedTitle} />
        </View>
      );
    }
    return (
      <View style={styles.slide}>
        <AppText text={item} style={styles.title} />
      </View>
    );
  };

  renderDayComponent() {
    const { date, currentDay, currentYear, currentMonth, daysInMonth, indexs } = this.state;
    const days = this.getDays(daysInMonth);
    return (
      <View style={styles.componentWrap}>
        <Carousel
          vertical
          ref={c => {
            this.day = c;
          }}
          firstItem={indexs.dayIndex}
          onSnapToItem={index => this.onChangeDay(index)}
          data={days}
          initialNumToRender={days.length}
          nestedScrollEnabled
          renderItem={item => this.renderItem(item.item, item.index, 'dayIndex')}
          itemHeight={40}
          style
          sliderHeight={120}
        />
      </View>
    );
  }

  renderMonthComponent() {
    const { date, currentDay, currentYear, currentMonth, daysInMonth, indexs } = this.state;
    const days = this.getDays(daysInMonth);
    return (
      <View style={styles.componentWrap}>
        <Carousel
          vertical
          ref={c => {
            this.month = c;
          }}
          data={months}
          firstItem={indexs.monthIndex}
          initialNumToRender={12}
          onSnapToItem={index => this.onChangeMonth(index)}
          renderItem={item => this.renderItem(item.item, item.index, 'monthIndex')}
          nestedScrollEnabled
          itemHeight={40}
          style
          sliderHeight={120}
        />
      </View>
    );
  }

  renderYearComponent() {
    const { date, currentDay, currentYear, currentMonth, daysInMonth, indexs, years } = this.state;
    return (
      <View style={styles.componentWrap}>
        <Carousel
          vertical
          ref={c => {
            this.year = c;
          }}
          data={years}
          initialNumToRender={yearsList.length}
          firstItem={indexs.yearIndex}
          onSnapToItem={index => this.onChangeYear(index)}
          nestedScrollEnabled
          renderItem={item => this.renderItem(item.item, item.index, 'yearIndex')}
          itemHeight={40}
          style
          sliderHeight={120}
        />
      </View>
    );
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.containerStyle, style]}>
        {this.renderDayComponent()}
        {this.renderMonthComponent()}
        {this.renderYearComponent()}
      </View>
    );
  }
}

let styles = {
  containerStyle: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    ...Styles.ViewStyle.shadowStyle
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    alignSelf: 'center',
    paddingVertical: 8
  },
  selectedSlide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    alignSelf: 'center',
    paddingVertical: 8,
    borderBottomColor: Colors.MAIN_COLOR,
    borderBottomWidth: 3
  },
  componentWrap: {
    flex: 1,
    height: '100%'
  },
  title: {
    color: '#d8d8d8',
    fontSize: 14,
    fontWeight: '400'
  },
  selectedTitle: {
    color: Colors.MAIN_COLOR,
    fontSize: 14,
    fontWeight: '400'
  }
};
