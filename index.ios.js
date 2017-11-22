import { AppRegistry } from 'react-native';
import WuApp from './app/wu-app';

import { Sentry } from 'react-native-sentry';

Sentry.config("https://dc4fdf790c9a4acdacb8ba05cb479b55:971709b2b0494143bc248e140f31d273@sentry.io/194538").install();


AppRegistry.registerComponent('warehouse-updater', () => WuApp);
