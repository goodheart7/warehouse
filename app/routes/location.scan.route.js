import React, { Component } from "react";
import { AlertIOS } from "react-native";
import { connect } from "react-redux";
import {
  isItCorrectLocationCode,
  renewState,
} from "../actions/location.actions";
import { REQUEST_STATES } from "../config/config";
import Scanner from "../components/scanner";
import StockRoute from "../routes/location.route";

const mapStateToProps = state => state.location;

class LocationScan extends Component {
  state = { active: true };
  render() {
    return (
      <Scanner
        requestPending={this.props.requestState === REQUEST_STATES.PENDING}
        onBarCodeRead={response => {
          const barcodeId = response.data;
          if (!this.state.active) return;
          this.setState({ active: false });
          this.props.isItCorrectLocationCode(barcodeId, error => {
            if (error) {
              AlertIOS.alert(error.msg, null, () => {
                this.props.renewState();
                this.setState({ active: true });
              });
            } else {
              this.props.navigator.replace({
                title: this.props.data.name,
                component: StockRoute,
              });
            }
          });
        }}
      />
    );
  }
}

export default connect(mapStateToProps, {
  isItCorrectLocationCode,
  renewState,
})(LocationScan);
