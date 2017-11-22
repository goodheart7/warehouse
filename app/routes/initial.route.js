import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

import { COLORS, SIZES, TEXTS, ROUTES } from "../config/config";
import InventoryScan from "./item.scan.route";
import LocationScan from "./location.scan.route";

import VersionNumber from "react-native-version-number";

const goToInventoryScan = navigator => {
  navigator.push({
    title: ROUTES.INVENTORY_LOOKUP,
    component: InventoryScan,
  });
};

const goToLocationScan = navigator => {
  navigator.push({
    title: ROUTES.LOCATION_SCAN,
    component: LocationScan,
  });
};

const Initial = ({ navigator }) => (
  <View style={styles.rootContainer}>
    <TouchableHighlight onPress={() => goToInventoryScan(navigator)}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{TEXTS.INVENTORY_LOOKUP}</Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => goToLocationScan(navigator)}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{TEXTS.LOCATION_SCAN}</Text>
      </View>
    </TouchableHighlight>
    <Text style={styles.appVersion}>
      Version {VersionNumber.appVersion}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: COLORS.GREY,
    paddingTop: SIZES.TOP_OFFSET,
  },
  innerContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: COLORS.WHITE,
    padding: SIZES.OUTER_PADDING,
    marginBottom: 1,
  },
  text: {},
  appVersion: {
    textAlign: "center",
    fontSize: 10,
    marginTop: 10,
    textDecorationColor: "#666",
  },
});

export default Initial;
