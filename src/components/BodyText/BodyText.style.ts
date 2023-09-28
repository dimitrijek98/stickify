import {StyleSheet} from 'react-native';
import {APP_DANGER, APP_DARK, APP_GRAY} from '_shared/theme/appColors';

export const bodyTextStyle = StyleSheet.create({
  dark: {
    color: APP_DARK,
  },
  light: {
    color: APP_GRAY,
  },
  danger: {
    color: APP_DANGER,
  },
});
