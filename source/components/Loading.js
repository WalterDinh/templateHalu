import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Text,
  ImageBackground
} from "react-native";
import { Images } from "utilities";
import { AppImage } from "components";

export default class AppText extends React.Component {
  render() {
    const {
      onRequestClose,
      onOutsidePress,
      transparent,
      animationType,
      message
    } = this.props;
    return (
      <Modal
        visible={this.props.visible}
        animationType={animationType ? animationType : "none"}
        onRequestClose={() => {}}
        transparent={transparent ? transparent : true}
      >
        <ImageBackground source={Images.loading} style={styles.container}>
          <ActivityIndicator
            animating={this.props.animating}
            color={"#DBA901"}
            size="large"
          />
          <Text style={[styles.text]}>
            {message ? message : "Loading..."}
          </Text>
        </ImageBackground>
      </Modal>
    );
  }
}

let styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },

  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#DBA901"
  }
};
