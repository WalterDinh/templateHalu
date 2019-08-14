import React from "react";
import { View } from "react-native";
import Button from "./Button";
import ArilTouchAble from "./ArilTouchAble";
import AppText from "./AppText";
import Avatar from "./Avatar";
import { Colors, Consts } from "utilities";
import { Header, Icon } from "react-native-elements";

export default class TittleHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.headerContainer,{height:this.props.avatar ? 130 : 80}]}>
        <View style = {styles.line}/>
        <View style={styles.tittleContainer}>
          {this.props.avatar ?
              <Avatar source={this.props.avatar}/> :
              <AppText text={this.props.tittle} style={styles.tittle}/>
          }
        </View>
        <View style = {styles.line}/>
      </View>
    );
  }
}

const styles = {
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 80,
    width: "100%",
    backgroundColor: "transparent"
  },
  tittle:{
    color:"black",
    fontSize:Consts.FONT_SIZE.HEADER,
    fontWeight:"bold"
  },
  line:{
    backgroundColor: "black",
    height:5,
    flex:2
  },
  tittleContainer:{
    flex:5,
    justifyContent: "center",
    alignItems: "center",

  }

};
