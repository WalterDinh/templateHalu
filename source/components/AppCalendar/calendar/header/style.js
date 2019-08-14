import { StyleSheet, Platform } from 'react-native';
import { Colors, Consts, Styles } from 'utilities';
import * as defaultStyle from '../../style';

const STYLESHEET_ID = 'stylesheet.calendar.header';

export default function(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme };
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    yearText: {
      fontSize: 18,
      fontWeight: '600',
      alignSelf: 'center',
      color: 'black',
      marginTop: 10,
      letterSpacing: 3
    },
    monthText: {
      fontSize: appStyle.textMonthFontSize,
      fontWeight: '600',
      color: Colors.MAIN_COLOR,
      margin: 10
    },
    otherMonthText: {
      fontSize: 13,
      color: Colors.TEXT_COLOR,
      fontWeight: '400',
      margin: 10
    },
    arrow: {
      padding: 10
    },
    arrowImage: {
      ...Platform.select({
        ios: {
          tintColor: appStyle.arrowColor
        },
        android: {
          tintColor: appStyle.arrowColor
        }
      })
    },
    week: {
      marginTop: 7,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 20,
      fontWeight: '600',
      textAlign: 'center',
      fontSize: 14,
      color: Colors.TEXT_COLOR
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
