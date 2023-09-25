import {StyleSheet} from 'react-native';

export const albumSectionListStyles = StyleSheet.create({
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
});
