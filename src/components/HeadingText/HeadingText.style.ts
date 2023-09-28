import {StyleSheet} from 'react-native';

const commonStyle = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
});

export const headingTextStyle = StyleSheet.create({
  h1: {
    fontSize: 24,
    ...commonStyle.bold,
  },
  h2: {
    fontSize: 20,
    ...commonStyle.bold,
  },
  h3: {
    fontSize: 18,
    ...commonStyle.bold,
  },
});
