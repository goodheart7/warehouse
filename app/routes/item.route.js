import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import { map, groupBy } from "lodash";

import { TEXTS, COLORS, SIZES } from "../config/config";

const mapPropsValues = state => {
  const item = state.item.data;

  // Combines all locations and the corresponding quantities in a single string
  const generateLocationsString = map(item.locations, location => {
    return (
      (location.name && location.name + "(" + location.quantity + ")") ||
      TEXTS.EMPTY
    );
  }).join(", ");

  // Item options grouped by property name
  const options = groupBy(item.options, "name");

  // Returns the value of an option
  const getOptionValue = key => {
    return (options[key] && options[key][0].value) || TEXTS.EMPTY;
  };

  // Returns the value of an item
  const getItemValue = key => {
    return item[key] === undefined ? TEXTS.EMPTY : item[key];
  };

  const allProps = [
    { key: "Name", value: getItemValue("name") },
    { key: "Locations", value: generateLocationsString },
    { key: "Style", value: getOptionValue("sku") },
    { key: "EAN", value: getItemValue("ean") },
    { key: "Size", value: getOptionValue("size") },
    { key: "Color", value: getOptionValue("color") },
    { key: "Price", value: (getItemValue("sale_price") ? getItemValue("sale_price") : getItemValue("price"))/100 }
  ];

  return {
    images: item.images,
    all: allProps,
  };
};

const mapStateToProps = state => {
  return mapPropsValues(state);
};

class InventoryLookupDetails extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{ uri: "https:" + this.props.images[0] }}
            style={{ width: 320, height: 320 }}
            resizeMode="contain"
          />
          {this.props.all.map(itemProp => (
            <View style={styles.row} key={itemProp.key + "View"}>
              <Text style={styles.key} key={itemProp.key + "Key"}>
                {itemProp.key}
              </Text>
              <Text style={styles.value} key={itemProp.key + "Value"}>
                {itemProp.value}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.WHITE,
  },
  text: {},
  row: {
    padding: SIZES.OUTER_PADDING,
    flexDirection: "row",
  },
  key: {
    fontWeight: "bold",
    flex: 3,
  },
  value: {
    color: "#666",
    flex: 5,
  },
});

export default connect(mapStateToProps)(InventoryLookupDetails);
