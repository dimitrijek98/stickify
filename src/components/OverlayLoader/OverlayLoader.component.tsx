import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {overlayLoaderStyle} from 'components/OverlayLoader/OverlayLoader.style';

type OverlayLoaderProps = {
  label?: string;
};

const OverlayLoaderComponent: FC<OverlayLoaderProps> = ({label}) => {
  return (
    <View
      style={[StyleSheet.absoluteFill, overlayLoaderStyle.loadingContainer]}>
      <ActivityIndicator />
      {!!label && <Text>{label}</Text>}
    </View>
  );
};

export default OverlayLoaderComponent;
