import {StyleSheet} from 'react-native';
import {APP_GRAY} from '_shared/theme/appColors';

export const albumStyles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionList: {
    paddingTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
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
});
