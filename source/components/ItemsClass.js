import { View, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { Colors } from 'utilities';
import { Consts, I18n, Images } from 'utilities';
import { Styles } from 'utilities/index';
import { Icon } from 'react-native-elements';
import { backgroundColor } from 'components/AppCalendar/style';
import AppImage from './AppImage';
import { AppText } from '.';

const moment = require('moment');

export default class ItemsClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSlot: false,
      todayTs: 1547188200,
      isCheckSlot: true
    };
  }

  // eslint-disable-next-line react/sort-comp
  renderSlot(had, seats) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <AppText style={styles.txt} text={I18n.t('itemsClass.had')} />
        <AppText style={styles.txtGreen} text={had} />
        <AppText style={styles.txtStatus2} text="/" />
        <AppText style={styles.txtStatus2} text={seats} />
        <AppText style={styles.txtStatus2} text={I18n.t('itemsClass.seats')} />
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderStatusClass(status) {
    return <View style={styles.imgAvtStatus} />;
  }

  renderAvt(sourceImage, name, status) {
    const { hasStatus } = this.props;
    return (
      <View style={styles.image}>
        <View style={styles.img}>
          <AppImage
            resizeMode="cover"
            style={styles.imgAvt}
            source={{
              uri:
                sourceImage ||
                'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            }}
          />

          {hasStatus ? this.renderStatusClass(status) : null}
          {hasStatus ? <AppText style={styles.txtstatus} text={status} /> : null}
        </View>
        <AppText style={styles.name} text={name} numberOfLines={1} />
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderNameClass(className) {
    return (
      <View style={styles.nameClass}>
        <AppText style={styles.className} text={className} />
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderStatus2(start, location, tag) {
    return (
      <View style={styles.status2}>
        <View style={styles.star}>
          <Icon size={22} type="ionicon" color="#35C565" name="md-star-outline" />
          <AppText style={styles.txtStatus2} text={start} />
        </View>

        <View style={styles.location}>
          <Icon size={18} type="octicon" color="#35C565" name="location" />
          <AppText style={styles.txtStatus2} text={location} numberOfLines={1} />
        </View>

        <View style={styles.tag}>
          <Icon size={18} type="octicon" color="#35C565" name="tag" />
          <AppText style={styles.txtStatus2} text={tag} />
        </View>
      </View>
    );
  }

  renderStatus3(group, had, seats, path) {
    return (
      <View style={styles.status3}>
        <View style={styles.group}>
          <View style={styles.groupBoder}>
            <AppText style={styles.txt} text={group} />
          </View>
        </View>

        <View style={styles.slot}>
          {/* <AppText style={styles.txtStatus2} text={I18n.t('itemsClass.had')}/>
            <AppText style={styles.txtGreen} text={had}/>
            <AppText style={styles.txtStatus2} text='/'/>
            <AppText style={styles.txtStatus2} text={seats}/>
            <AppText style={styles.txtStatus2} text={I18n.t('itemsClass.seats')}/> */}
          {group === 'GROUP' ? this.renderSlot(had, seats) : null}
        </View>

        <View style={styles.path}>
          <Icon size={18} type="ionicon" color="#35C565" name="md-paper-plane" />
          <AppText style={styles.txtStatus2} text={path} />
        </View>
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _getUnix() {
    const unixTimestamp = moment().unix();
    return unixTimestamp;
  }

  _checkActive(todayTs, endDateTs, active) {
    if (!endDateTs) {
      return null;
    }
    if (active == 2) {
      return 'CANCEL';
    }
    if (active == 3) {
      return 'FINISH';
    }
    if (active == 1) {
      if (endDateTs > todayTs) {
        return 'STUDYING';
      }
      return 'FINISH';
    }
  }

  // eslint-disable-next-line class-methods-use-this
  distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    }
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist *= 1.609344;
    }
    if (unit == 'N') {
      dist *= 0.8684;
    }
    return dist;
  }

  renderListClass(item, todayTs, user) {
    if (!item) {
      return null;
    }
    const lat1 = item.latitude ? item.latitude : 0;
    const lon1 = item.longitude ? item.longitude : 0;
    const lat2 = user.latitude ? user.latitude : 0;
    const lon2 = user.longitude ? user.longitude : 0;
    console.log('item', item.active);
    return (
      <View style={[styles.container, Styles.ViewStyle.shadowStyle]}>
        {/* {this._checkActive(this.state.todayTs, item.endDateTs, item.active)} */}
        {this.renderAvt(
          item.belongToUser.avatar,
          item.belongToUser.firstName,
          this._checkActive(todayTs, item.endDateTs, item.active)
        )}
        <View style={styles.content}>
          {this.renderNameClass(item.name)}

          {this.renderStatus2(
            item.experience ? item.experience : 0,
            item.location,
            item.costPerHour
          )}

          {this.renderStatus3(
            item.classType ? item.classType.toUpperCase() : '',
            item.enrol.length ? item.enrol.length : '0',
            item.maxStudent ? item.maxStudent : '10',
            this.distance(lat1, lon1, lat2, lon2, 'K')
              ? `${this.distance(lat1, lon1, lat2, lon2, 'K').toFixed(1)} Km`
              : '0.0Km'
          )}
        </View>
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderSlotDay(startDate) {
    if (!this.checkNumberOfDayLeft(startDate)) {
      return null;
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <AppText text="Time left to register" style={styles1.txtContent} numberOfLines={1} />
        <AppText
          text={this.checkNumberOfDayLeft(startDate)}
          style={styles1.txtContentGreen}
          numberOfLines={1}
        />
        {/* <AppText text="ngay" style={styles1.txtContent} numberOfLines={1} /> */}
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  checkNumberOfDayLeft(startDate) {
    const today = moment();
    const startDateMoment = moment(startDate);
    // console.log('DAYTEST===========>', today.to(startDateMoment, true));
    const a = today.to(startDateMoment);
    const b = a.slice(-3);
    // console.log('===========>>>>>>>>>>>>>>>>>>>>>>>>>>>', a.slice(-3));
    if (b == 'ago') {
      return null;
    }
    return today.to(startDateMoment, true);
  }

  // eslint-disable-next-line class-methods-use-this
  renderSlotEmpty(item) {
    if (item.enrol) {
      const enrol = item.enrol.filter(number => {
        return number.active == 1;
      });
    }
    if (!item) {
      return null;
    }
    if (item.classType == 'Private') {
      return null;
    }
    console.log('sadsadasd', item);
    return (
      <View style={styles1.contentRight}>
        <Icon size={15} type="ionicon" color="#000000" name="md-contacts" />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AppText
            style={styles1.txtSlot}
            text={
              item.enrol.filter(number => {
                return number.active == 1;
              }).length
                ? item.enrol.filter(number => {
                    return number.active == 1;
                  }).length
                : 0
            }
          />
          <AppText style={styles1.txtContent} text="/" />
          <AppText style={styles1.txtContent} text={item.maxStudent ? item.maxStudent : '10'} />
        </View>
      </View>
    );
  }

  renderListClassed(item) {
    console.log('exp', item);
    return (
      <View style={[styles1.container, Styles.ViewStyle.shadowStyle]}>
        <View style={styles1.left}>
          <AppText text={item.name} style={styles1.txtName} numberOfLines={1} />

          <View style={styles1.between}>
            <View style={styles.star}>
              <Icon size={20} type="ionicon" color="#000000" name="md-star-outline" />
              <AppText style={styles1.txtContent} text={item.experience ? item.experience : 0} />
            </View>

            <View style={styles.location}>
              {/* <Icon size={16} type="ionicon" color="#000000" name="md-pin" /> */}
              <Icon size={16} type="octicon" color="#000000" name="location" />
              <AppText style={styles1.txtContent} text={item.location} numberOfLines={1} />
            </View>

            <View style={styles.tag}>
              <Icon size={16} type="octicon" color="#000000" name="tag" />
              {/* <Icon size={16} type="ionicon" color="#000000" name="md-pricetags" /> */}
              <AppText
                style={styles1.txtContent}
                text={`${item.costPerHour / 1000}k /${I18n.t('classDetail.price')}`}
                numberOfLines={1}
              />
            </View>
          </View>
          <View style={styles1.bottom}>
            <View style={styles1.group}>
              <View style={styles1.groupBoder}>
                <AppText
                  style={styles1.txt}
                  text={item.classType ? `${item.classType.toUpperCase()} CLASS ` : ''}
                />
              </View>
            </View>

            {item.classType == 'Group' ? this.renderSlotDay(item.startDate) : null}
          </View>
        </View>
        <View style={styles1.right}>{this.renderSlotEmpty(item)}</View>
      </View>
    );
  }

  render() {
    const { item, classed, user } = this.props;

    // eslint-disable-next-line no-underscore-dangle
    console.log('user', user);
    const todayTs = this._getUnix();
    // {this.renderListClass(item, endDateTs, active, todayTs)}
    return (
      <View>
        {classed ? this.renderListClassed(item) : this.renderListClass(item, todayTs, user)}
      </View>
    );
  }
}

let styles1 = {
  container: {
    width: '92%',
    padding: 8,
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 5,
    flexDirection: 'row',
    marginHorizontal: 10
  },
  left: {
    flex: 4
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  contentRight: {
    width: 50,
    height: 50,
    borderRadius: 70 / 2,
    backgroundColor: '#fced6d',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtSlot: {
    color: '#35C565',
    fontSize: 12
  },
  txtName: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  between: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  txtContent: {
    fontSize: 10,
    marginLeft: 3
  },
  txtContentGreen: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 3,
    color: '#35C565'
  },
  group: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginRight: 10
  },
  groupBoder: {
    paddingHorizontal: 3,
    borderColor: '#00000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  txt: {
    fontSize: 10,
    fontWeight: '500',
    color: '#ffffff'
  }
};

let styles = {
  container: {
    width: '95%',
    padding: 4,
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 27,
    marginBottom: 10,
    marginTop: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 3.5,
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgAvt: {
    width: '100%',
    height: '100%',
    borderRadius: 150 / 2,
    position: 'absolute'
  },
  imgAvtStatus: {
    backgroundColor: '#777777',
    width: '100%',
    height: '100%',
    borderRadius: 150 / 2,
    position: 'absolute',
    justifyContent: 'center',
    opacity: 0.5
  },
  txtstatus: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 9,
    fontWeight: 'bold',
    position: 'absolute',
    width: '100%'
  },
  name: {
    fontSize: 11,
    fontWeight: '500',
    color: '#343434',
    marginTop: 2,
    marginLeft: 3
  },
  nameClass: {
    flex: 1,
    justifyContent: 'center'
  },
  status2: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  status3: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  className: {
    fontSize: 12,
    fontWeight: '600'
  },
  star: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  location: {
    flex: 2.5,
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  tag: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  txtStatus2: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 3
  },
  txt: {
    fontSize: 10,
    fontWeight: '600'
  },
  txtGreen: {
    fontSize: 10,
    fontWeight: '600',
    color: '#35C565'
  },
  imgStar: {
    width: 12,
    height: 11
  },
  imgLocation: {
    width: 10,
    height: 12
  },
  imgTag: {
    width: 13,
    height: 11
  },
  imgpath: {
    width: 13,
    height: 12
  },
  group: {
    flex: 1.2,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  slot: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  path: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupBoder: {
    paddingHorizontal: 3,
    borderColor: '#00000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
