import { View, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import React from 'react';
import { Consts, I18n, Images, Colors } from 'utilities';
import { Styles } from 'utilities/index';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { AppText } from '.';
import AppImage from './AppImage';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class ClassInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  renderTop(location, cost, rating) {
    return (
      <View style={styles.top}>
        <View style={styles.starPay}>
          <Icon size={23} type="ionicon" color="#35C565" name="md-star-outline" />
          <AppText style={styles.txtstartPay} text={rating} numberOfLines={1} />
        </View>

        <View style={styles.locationPay}>
          <Icon size={18} type="octicon" color="#35C565" name="location" />
          <AppText style={styles.txtlocationPay} text={location} numberOfLines={1} />
        </View>

        <View style={styles.tagPay}>
          <Icon size={18} type="octicon" color="#35C565" name="tag" />
          <AppText
            style={styles.txttagPay}
            text={`${cost / 1000}k /${I18n.t('classDetail.price')}`}
            numberOfLines={1}
          />
        </View>
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderBetween(totalTimePerHour, totalDays, classLevel) {
    return (
      <View style={styles.between}>
        <View style={styles.timePay}>
          <Icon size={17} type="ionicon" color="#35C565" name="md-time" />
          <AppText
            style={styles.txttimePay}
            text={`${totalTimePerHour} ${I18n.t('classDetail.hours')}`}
            numberOfLines={1}
          />
        </View>

        <View style={styles.sessionPay}>
          <Icon size={19} type="ionicon" color="#35C565" name="md-copy" />
          <AppText
            style={styles.txtsessionPay}
            text={`${totalDays} ${I18n.t('classDetail.session')}`}
            numberOfLines={1}
          />
        </View>

        <View style={styles.classPay}>
          <Icon size={20} type="ionicon" color="#35C565" name="md-book" />
          <AppText style={styles.txtclassPay} text={classLevel} numberOfLines={1} />
        </View>
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderEnd(classModel, classType,coverDate1,coverDate2) {
    return (
      <View style={styles.end}>
        <View style={styles.privateClass}>
          <AppText
            style={styles.txtPrivateClass}
            text={classType ? `${classType.toUpperCase()} CLASS` : ''}
          />
          <AppText
            style={styles.txtPrivateClass}
            text={classModel ? classModel.toUpperCase() : ''}
          />
        </View>
        {classType === 'Group' ? (
          <AppText
            text={`${I18n.t('time')}: ${coverDate1} - ${coverDate2}`}
            style={{
              marginTop: 10,
              color: Colors.TEXT_PAY1,
              fontSize: Consts.FONT_SIZE.TEXT,
              width: '100%'
              // fontWeight: 'bold'
            }}
          />
        ) : null}
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderNamePay(name) {
    return (
      <View>
        <AppText text={name} style={styles.txtNameClass} />
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderName(name) {
    return (
      <View style={{ width: '95%' }}>
        <AppText text={name} style={styles.txtNameClass} numberOfLines={3} />
      </View>
    );
  }

  render() {
    const { style, classes, pay } = this.props;
    const {
      name,
      location,
      costPerHour,
      experience,
      totalTimePerHour,
      totalDays,
      classLevel,
      classModel,
      classType
    } = classes;
    const coverDate1 = moment(classes.startDate).format('DD/MM/YYYY');
    const coverDate2 = moment(classes.endDate).format('DD/MM/YYYY');
    return (
      <View style={style}>
        {pay ? this.renderNamePay(name) : this.renderName(name)}
        {this.renderTop(location, costPerHour, experience || 0)}
        {this.renderBetween(totalTimePerHour, totalDays, classLevel)}
        {this.renderEnd(classModel, classType,coverDate1,coverDate2)}
      </View>
    );
  }
}

let styles = {
  container: {
    width: '100%',
    height: '100%'
  },
  top: {
    width: '94%',
    height: 35,
    flexDirection: 'row'
  },
  status1: {
    width: '95%',
    height: 35,
    flexDirection: 'row',
    marginTop: 5
  },
  starPay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imagestartPay: {
    width: 17,
    height: 16
  },
  txtstartPay: {
    flex: 2,
    // fontWeight: '500',
    fontSize: 12,
    color: Colors.TEXT_PAY1,
    marginLeft: 3
  },
  locationPay: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  imagelocationPay: {
    width: 14,
    height: 17
  },
  txtlocationPay: {
    // fontWeight: '500',
    color: Colors.TEXT_PAY1,
    fontSize: Consts.FONT_SIZE.TEXT,
    marginLeft: 3
  },
  tagPay: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 5
  },
  imagetagPay: {
    width: 20,
    height: 16
  },
  txttagPay: {
    // fontWeight: '500',
    color: Colors.TEXT_PAY1,
    fontSize: Consts.FONT_SIZE.TEXT,
    marginLeft: 3
  },
  between: {
    width: '95%',
    height: 35,
    flexDirection: 'row',
    marginTop: 0
  },
  timePay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: Consts.FONT_SIZE.TEXT
  },
  imagetimePay: {
    width: 15,
    height: 15
  },
  txttimePay: {
    flex: 2,
    // fontWeight: '500',
    color: Colors.TEXT_PAY1,
    fontSize: 12,
    marginLeft: 5
  },
  sessionPay: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imagesessionPay: {
    width: 15,
    height: 17
  },
  txtsessionPay: {
    // fontWeight: '500',
    color: Colors.TEXT_PAY1,
    fontSize: Consts.FONT_SIZE.TEXT,
    marginLeft: 5
  },
  classPay: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imageclassPay: {
    width: 16,
    height: 15
  },
  txtclassPay: {
    // fontWeight: '500',
    color: Colors.TEXT_PAY1,
    fontSize: Consts.FONT_SIZE.TEXT,
    marginLeft: 5
  },
  end: {
    width: '92%',
  },
  privateClass: {
    flexDirection: 'row'
  },
  txtPrivateClass: {
    borderColor: Colors.BODER_AVT_LOGO,
    borderWidth: 2,
    padding: 1,
    paddingTop: 3,
    paddingHorizontal: 6,
    fontSize: 11,
    fontWeight: '500',
    color: Colors.TEXT_PAY1,
    marginRight: 20,
    textAlign: 'center'
  },
  txtNameClass: {
    fontSize: 14,
    color: Colors.TEXT_PAY,
    fontWeight: '500'
  }
};
