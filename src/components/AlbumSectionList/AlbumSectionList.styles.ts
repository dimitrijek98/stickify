import {StyleSheet} from 'react-native';
import {APP_DARK} from '_shared/theme/appColors';

export const albumSectionListStyles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_DARK,
  },
  sectionList: {
    paddingTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
});
