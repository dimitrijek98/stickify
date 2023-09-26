import {StyleSheet} from 'react-native';
import {APP_DARK, APP_GRAY} from '_shared/theme/appColors';

export const stickerItemStyles = StyleSheet.create({
  collectedStickerItem: {
    backgroundColor: '#6cdf9f',
  },
  stickerItem: {
    width: 40,
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: APP_GRAY,
  },
  stickerLabel: {
    color: APP_DARK,
  },
});
