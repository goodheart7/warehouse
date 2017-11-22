import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import { pick } from "lodash";
import overlayImage from '../../assets/scanner-overlay.png';

export default class ScannerOverlay extends Component {
  render() {
    return (
      <View
        style={[
          styles.overlayWrapper,
          { ...pick(Dimensions.get("window"), "width", "height") },
        ]}
      >
        <Image source={overlayImage} style={styles.overlay} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlayWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  overlay: {
    width: 360,
    height: 360,
  },
});
