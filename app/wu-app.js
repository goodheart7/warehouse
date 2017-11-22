import React from "react";
import { NavigatorIOS, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { COLORS, ROUTES } from "./config/config";
import Initial from "./routes/initial.route";
import initialReducer from "./reducers/initial.reducer";

const middlewares = [thunk];

// eslint-disable-next-line no-undef
if (__DEV__) {
  middlewares.push(logger);
}
const store = createStore(initialReducer, applyMiddleware(...middlewares));

const WuApp = () => (
  <Provider store={store}>
    <NavigatorIOS
      initialRoute={{
        title: ROUTES.INITIAL,
        component: Initial,
        backButtonTitle: "Back",
      }}
      barTintColor={COLORS.BLACK}
      titleTextColor={COLORS.WHITE}
      style={style.container}
    />
  </Provider>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WuApp;
