import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight } from "react-native";
import { COLORS, TEXTS } from "../config/config";

class StockItem extends Component {
  render() {
    const { count, name, images, ean } = this.props.item;
    return (
      <View style={styles.container}>
          <Image source={{ uri: "https:" + images[0] }} style={{ width: 45, height:60, resizeMode: 'contain', flex:1, padding: 5 }} />
          <View style={styles.info}>
            <Text style={styles.ean}>{ean || TEXTS.EMPTY}</Text>
            <Text style={styles.name}>{name || TEXTS.EMPTY}</Text>
            <Text style={styles.details}>
              {
                (this.props.item.size || TEXTS.EMPTY, this.props.item.color ||
                  TEXTS.EMPTY)
              }
            </Text>
          </View>
          <View style={styles.counter}>
            <Text style={styles.num}>{count || 0}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 1,
    backgroundColor: COLORS.WHITE,
    flexDirection: "row",
  },
  info: {
    flex: 4,
  },
  counter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  num: {
    fontWeight: "bold",
  },
  ean: {
    fontWeight: "bold",
  },
  name: {},
  details: {
    color: COLORS.GREY,
  },
});

export default StockItem;
