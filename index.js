/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App'; // Import your main App component
import { name as appName } from './app.json'; // Import the app name

AppRegistry.registerComponent(appName, () => App); // Register your app correctly

