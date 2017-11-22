import React, { Component } from "react";
import { connect } from "react-redux";
import { AlertIOS } from "react-native";

import { REQUEST_STATES } from "../config/config";
import { getItem, renewState } from "../actions/item.actions";
import InventoryLookupDetailsRoute from "../routes/item.route";
import Scanner from "../components/scanner";

const mapStateToProps = state => state.item;

const mapDispatchToProps = (dispatch, props) => ({
  onBarCodeRead: barcode => {
    dispatch(
      getItem(barcode.data, (error, item) => {
        if (error) {
          AlertIOS.alert(error.msg, null, () => {
            dispatch(renewState());
          });
        } else {
          props.navigator.push({
            title: item.name,
            component: InventoryLookupDetailsRoute,
          });
        }
      }),
    );
  },
});

class InventoryLookup extends Component {
  render() {
    return (
      <Scanner
        requestPending={this.props.requestState === REQUEST_STATES.PENDING}
        onBarCodeRead={this.props.onBarCodeRead}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryLookup);
