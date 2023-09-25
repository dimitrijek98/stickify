import React, {useEffect, useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {cameraStyles} from 'components/Camera/Camera.style';
import TextRecognition, {
  TextBlock,
} from '@react-native-ml-kit/text-recognition';
import {AVAILABLE_VALUES} from '_shared/helpers/trimLineBreaks';

const CameraComponent = () => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [detectedStickers, setDetectedStickers] = useState<string[]>([]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const addDetectedSticker = (newSticker: string) => {
    if (!detectedStickers.some(sticker => sticker === newSticker)) {
      setDetectedStickers([...detectedStickers, newSticker]);
    }
  };

  const analyzeTextBlock = (textBlock: TextBlock) => {
    const detectionArray = textBlock.text.match(AVAILABLE_VALUES);
    if (detectionArray) {
      addDetectedSticker(detectionArray[0]);
    }
  };

  const takePicture = async () => {
    const photo = await camera?.current?.takePhoto();
    if (photo) {
      const result = await TextRecognition.recognize(`file://${photo.path}`);
      result.blocks.map(block => {
        analyzeTextBlock(block);
      });
    }
  };

  if (!hasPermission || !device) {
    return <ActivityIndicator />;
  }
  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        zoom={0}
        device={device}
        photo={true}
        isActive={true}
      />
      <View style={cameraStyles.selectedStickersContainer}>
        <FlatList
          horizontal={true}
          data={detectedStickers}
          renderItem={({item}) => (
            <Text style={cameraStyles.selectedSticker}>{item}</Text>
          )}
        />
      </View>
      <TouchableOpacity
        style={cameraStyles.shutterButton}
        onPress={takePicture}
      />
    </View>
  );
};

export default CameraComponent;
