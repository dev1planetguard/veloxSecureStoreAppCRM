/**
 * @format
 */

import {AppRegistry, Platform, UIManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { useEffect } from 'react';



AppRegistry.registerComponent(appName, () => App);
