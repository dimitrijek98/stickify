import React, {FC, useContext, useState} from 'react';
import {ScreenProps} from '_shared/types/ScreenProps';
import {ConfigContext} from 'services/Config.context';
import {
  TextBlock,
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';
import {trimLineBreaks} from '_shared/helpers/trimLineBreaks';
import TextRecognitionCameraComponent from 'components/TextRecognitionCamera/TextRecognitionCameraComponent';

const ScanStickerScreen: FC<ScreenProps<'ScanSticker'>> = ({navigation}) => {
  const {stickerValueRegex} = useContext(ConfigContext);
  const [detectedStickers, setDetectedStickers] = useState<string[]>([]);

  const addDetectedStickers = (newStickers: (string | null)[]) => {
    const newStickersList = [...detectedStickers];
    newStickers.forEach(newSticker => {
      if (
        !!newSticker &&
        !newStickersList.some(sticker => newSticker === sticker)
      ) {
        newStickersList.push(newSticker);
      }
    });

    setDetectedStickers(newStickersList);
  };

  const analyzeTextBlock = (textBlock: TextBlock): string | null => {
    const formattedBlock = trimLineBreaks(textBlock.text);
    const detectionArray = formattedBlock.match(stickerValueRegex);
    if (detectionArray) {
      return detectionArray[0];
    }
    return null;
  };

  const onPictureAnalyzed = (result: TextRecognitionResult) => {
    const analysedBlocks = result.blocks.map(block => analyzeTextBlock(block));

    addDetectedStickers(analysedBlocks);
  };

  const removeStickerFromList = (stickerToRemove: string) => {
    setDetectedStickers(
      detectedStickers.filter(sticker => sticker !== stickerToRemove),
    );
  };

  return (
    <TextRecognitionCameraComponent
      detectedStickers={detectedStickers}
      onImageAnalyzed={onPictureAnalyzed}
      onStickerListElementClick={removeStickerFromList}
      onCancel={() => navigation.pop()}
      onConfirm={() => navigation.pop()}
    />
  );
};

export default ScanStickerScreen;
