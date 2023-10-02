import {StyleSheet} from 'react-native';
import {APP_GRAY, APP_PRIMARY} from '_shared/theme/appColors';

export const statsStyle = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  statsLegendContainer: {
    gap: 20,
    paddingTop: 10,
  },
  percentageText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendPreview: {
    width: 20,
    height: 20,
  },
  legendPreviewComplete: {
    backgroundColor: APP_PRIMARY,
  },
  legendPreviewIncomplete: {
    backgroundColor: APP_GRAY,
  },
});
