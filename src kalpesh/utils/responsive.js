
import { Dimensions, PixelRatio, Platform } from 'react-native';
import {
  widthPercentageToDP as wpBase,
  heightPercentageToDP as hpBase,
} from 'react-native-responsive-screen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const wp = (percentage) => {
  return wpBase(typeof percentage === 'number' ? `${percentage}%` : percentage);
};

export const hp = (percentage) => {
  return hpBase(typeof percentage === 'number' ? `${percentage}%` : percentage);
};


const BASE_HEIGHT = 680;

export const responsiveFontSize = (fontSize) => {
  const heightPercent = (fontSize * SCREEN_HEIGHT) / BASE_HEIGHT;
  return Math.round(PixelRatio.roundToNearestPixel(heightPercent));
};

const BASE_WIDTH = 360;

export const responsiveFontSizeByWidth = (fontSize) => {
  const widthPercent = (fontSize * SCREEN_WIDTH) / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(widthPercent));
};
