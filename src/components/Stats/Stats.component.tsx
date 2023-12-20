import React, {FC, useCallback} from 'react';
import {useMemo} from 'react';
import {Album} from 'services/AlbumContext';
import {APP_GRAY, APP_PRIMARY} from '_shared/theme/appColors';
import PieChart from 'react-native-pie-chart';
import {Button, Share, StyleSheet, Text, View} from 'react-native';
import BodyText from 'components/BodyText/BodyText.component';
import {statsStyle} from 'components/Stats/Stats.style';
import HeadingText from 'components/HeadingText/HeadingText.component';
import Toast from 'react-native-toast-message';

const StatsComponent: FC<{album: Album}> = ({album}) => {
  const pieColors = [APP_PRIMARY, APP_GRAY];
  const completenessData: number[] = useMemo(() => {
    let collected = 0;
    let notCollected = 0;

    Object.keys(album).forEach(key => {
      Object.keys(album[key]).forEach(groupKey => {
        album[key][groupKey].collected ? collected++ : notCollected++;
      });
    });

    return [collected, notCollected];
  }, [album]);

  const completenessPercentage = useMemo(() => {
    const [collected, notCollected] = completenessData;
    if (!notCollected) {
      return '100%';
    }
    if (!collected) {
      return '0%';
    }

    const percentage = ((collected / notCollected) * 100).toFixed(2);

    return `${percentage}%`;
  }, [completenessData]);

  const shareMissingList = useCallback(() => {
    if (!completenessData[1]) {
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: 'Deljenj nije moguće',
        text2: 'Nemate sličica koje nedostaju',
      });
      return;
    }
    let list = '';

    Object.keys(album).forEach(key => {
      let missing: string[] = [];
      Object.keys(album[key]).forEach(groupKey => {
        if (!album[key][groupKey].collected) {
          missing.push(groupKey);
        }
      });
      if (missing.length > 0) {
        list = list.concat(`${key}: ${missing.join(', ')} \n\r`);
      }
    });

    Share.share({message: list});
  }, [album, completenessData]);

  return (
    <>
      <View>
        <HeadingText size={'h2'}>Statistika</HeadingText>
        <BodyText>
          Procenat popunjenosti albuma:
          <Text style={statsStyle.percentageText}>
            {completenessPercentage}
          </Text>
        </BodyText>
      </View>
      <View style={statsStyle.statsContainer}>
        <PieChart
          widthAndHeight={150}
          coverRadius={0.5}
          series={completenessData}
          sliceColor={pieColors}
        />
        <View style={statsStyle.statsLegendContainer}>
          <View style={statsStyle.statsLegend}>
            <View
              style={StyleSheet.compose(
                statsStyle.legendPreview,
                statsStyle.legendPreviewComplete,
              )}
            />
            <BodyText>Sakupljene</BodyText>
          </View>
          <View style={statsStyle.statsLegend}>
            <View
              style={StyleSheet.compose(
                statsStyle.legendPreview,
                statsStyle.legendPreviewIncomplete,
              )}
            />
            <BodyText>Nedostaju</BodyText>
          </View>
        </View>
      </View>
      <Button
        title={'Podeli koje nedostaju'}
        color={APP_PRIMARY}
        onPress={shareMissingList}
      />
    </>
  );
};

export default StatsComponent;
