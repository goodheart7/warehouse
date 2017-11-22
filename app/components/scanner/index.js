import React, { Component } from "react";
import {
  ActivityIndicator,
  Modal,
  View,
  StyleSheet,
} from "react-native";
import { debounce } from 'lodash';
import Camera from "react-native-camera";

import ScannerOverlay from "../../components/scanner-overlay";
import { DELAYS } from "../../config/config";

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.onBarCodeRead = debounce(this.props.onBarCodeRead, DELAYS.SCAN, {leading: true, trailing: false});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.requestPending
          ? <Modal transparent>
              <View style={styles.modal}>
                <View>
                  <ActivityIndicator size="large" />
                </View>
              </View>
            </Modal>
          : null}
        <Camera
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
        />
        <ScannerOverlay />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "stretch",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
});
