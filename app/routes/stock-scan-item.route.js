import React, { Component } from "react";
import { AlertIOS } from "react-native";
import { connect } from "react-redux";
import { REQUEST_STATES } from "../config/config";
import Scanner from "../components/scanner";
import { isItCorrectItemCode, addItemToStore, renewRequestState } from "../actions/stock.actions";

const mapStateToProps = state => state;

class StockScanItem extends Component {
  state = { active: true };

  render() {
    return (
      <Scanner
        requestPending={this.props.requestState === REQUEST_STATES.PENDING}
        onBarCodeRead={(response) => {
          const barcodeId = response.data;
          if (!this.state.active) return;
          this.setState({active: false});
          this.props.isItCorrectItemCode(barcodeId,  (error, item) => {
            if (error) {
              AlertIOS.alert(error.msg, null, () => {
                this.props.renewRequestState();
                this.setState({active: true});
              });
            } else {
                const hasStock = !item.locations || item.locations.filter(i => i.id === this.props.location.id).length > 0;
                if (hasStock) {
                    this.props.navigator.pop();
                    this.props.addItemToStore({...item, ean: barcodeId});
                } else {
                    const msg = "This item is expected at " + item.locations.map((i) => i.name).join(", ") + ". Do you want to add this as a new location?";
                    AlertIOS.alert("New location", msg, [
                        {text: 'Continue', onPress: () => {
                            this.props.navigator.pop();
                            this.props.addItemToStore({...item, ean: barcodeId});
                        }},
                        {text: 'Cancel', onPress: () => {
                            this.props.navigator.pop();
                        }}
                    ]);
                }
            }
          });
        }}
      />
    );
  }
}

export default connect(mapStateToProps, {
  isItCorrectItemCode,
  addItemToStore,
  renewRequestState,
})(StockScanItem);
