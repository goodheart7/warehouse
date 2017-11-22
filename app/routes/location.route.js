import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Modal,
  AlertIOS,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES, TEXTS, ROUTES } from "../config/config";
import { connect } from "react-redux";
import StockItem from "../components/stock-item";
import StockScanItem from "../routes/stock-scan-item.route";
import { stockSave, renewState } from "../actions/stock.actions";

const mapStateToProps = state => state;

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

class Stock extends Component {
  state = { updating: false };

  render() {
    const { items } = this.props.stock;
    const { id: locationId } = this.props.location.data;

    return (
      <View style={style.container}>
        {this.state.updating
          ? <Modal transparent>
              <View style={style.modal}>
                <View>
                  <ActivityIndicator size="large" />
                </View>
              </View>
            </Modal>
          : null}
        {items.length === 0
          ? <View style={style.emptyList}>
              <Text style={style.emptyListText}>No items.</Text>
            </View>
          : <ListView
              dataSource={ds.cloneWithRows(items)}
              renderRow={itemData => <StockItem item={itemData} />}
            />}
        <View style={style.bottomActions}>
          {items.length > 0
            ? <View style={style.bottomAction}>
                <TouchableHighlight
                  onPress={() => {
                    AlertIOS.alert(
                      "Do you want to submit inventory list?",
                      null,
                      [
                        { text: "Cancel" },
                        {
                          text: "Submit",
                          onPress: () => {
                            this.setState({ updating: true });
                            this.props.stockSave(locationId, items, error => {
                              if (error) {
                                AlertIOS.alert(error.msg, null, () => {
                                  this.setState({ updating: false });
                                });
                              } else {
                                AlertIOS.alert(
                                  "Store inventory updated successfully",
                                  null,
                                  () => {
                                    this.setState({ updating: false });
                                    this.props.renewState();
                                    this.props.navigator.pop();
                                  },
                                );
                              }
                            });
                          },
                        },
                      ],
                    );
                  }}
                >
                  <Text style={style.bottomActionText}>
                    {TEXTS.UPDATE_INVENTORY}
                  </Text>
                </TouchableHighlight>
              </View>
            : null}

          <View style={style.bottomAction}>
            <TouchableHighlight
              onPress={() =>
                this.props.navigator.push({
                  title: ROUTES.STOCK_ITEM,
                  component: StockScanItem,
                })}
            >
              <Text style={style.bottomActionText}>{TEXTS.INVOKE_CAMERA}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: COLORS.GREY,
    paddingTop: 64,
  },
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyListText: {
    color: "#666",
  },
  bottomActions: {
    alignItems: "stretch",
    justifyContent: "center",
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.6,
  },
  bottomAction: {
    borderTopWidth: 1,
    borderTopColor: "#CCC",
  },
  bottomActionText: {
    textAlign: "center",
    color: COLORS.BLUE,
    padding: SIZES.OUTER_PADDING,
    backgroundColor: COLORS.WHITE,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export default connect(mapStateToProps, { stockSave, renewState })(Stock);
