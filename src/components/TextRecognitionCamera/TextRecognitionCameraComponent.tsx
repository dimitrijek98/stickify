import React, {FC, useEffect, useRef, useState} from 'react';
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
import {cameraStyles} from 'components/TextRecognitionCamera/TextRecognitionCamera.style';
import TextRecognition, {
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {APP_DANGER, APP_DARK, APP_SUCCESS} from '_shared/theme/appColors';
import OverlayLoaderComponent from 'components/OverlayLoader/OverlayLoader.component';

type CameraComponentProps = {
  onImageAnalyzed: (result: TextRecognitionResult) => void;
  onStickerListElementClick: (sticker: string) => void;
  detectedStickers: string[];
  onCancel: () => void;
  onConfirm: () => void;
  type?: 'album' | 'sticker';
};

const TextRecognitionCameraComponent: FC<CameraComponentProps> = ({
  onImageAnalyzed,
  onStickerListElementClick,
  detectedStickers,
  onCancel,
  onConfirm,
  type = 'album',
}) => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [analyzingImageText, setAnalyzingImageText] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const takePicture = async () => {
    setAnalyzingImageText(true);

    const photo = await camera?.current?.takePhoto();
    if (photo) {
      const result = await TextRecognition.recognize(`file://${photo.path}`);
      onImageAnalyzed(result);
    }

    setAnalyzingImageText(false);
  };

  if (!hasPermission || !device) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <View style={StyleSheet.absoluteFill}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          zoom={0}
          device={device}
          photo={true}
          isActive={true}
        />
        {!!detectedStickers.length && (
          <View style={cameraStyles.selectedStickersContainer}>
            <FlatList
              ListHeaderComponent={
                <Text>
                  {type === 'album'
                    ? 'Sličice koje nedostaju:'
                    : 'Nove sličice:'}
                </Text>
              }
              data={detectedStickers}
              numColumns={4}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={cameraStyles.selectedSticker}
                  onPress={() => onStickerListElementClick(item)}>
                  <Text>{item}</Text>
                  <Text style={cameraStyles.removeSticker}>X</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <View style={cameraStyles.buttonRow}>
          <TouchableOpacity onPress={onCancel}>
            <MaterialIcons name={'close'} color={APP_DANGER} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={cameraStyles.shutterButton}
            onPress={takePicture}>
            <MaterialIcons name={'image-search'} color={APP_DARK} size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            disabled={!detectedStickers.length}>
            <MaterialIcons name={'check'} color={APP_SUCCESS} size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {analyzingImageText && (
        <OverlayLoaderComponent label={'Analiza slike...'} />
      )}
    </>
  );
};

export default TextRecognitionCameraComponent;
