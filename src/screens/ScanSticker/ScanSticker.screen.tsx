import React, {FC, useContext, useState} from 'react';
import {ScreenProps} from '_shared/types/ScreenProps';
import {ConfigContext} from 'services/Config.context';
import {
  TextBlock,
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';
import {trimLineBreaks} from '_shared/helpers/trimLineBreaks';
import TextRecognitionCameraComponent from 'components/TextRecognitionCamera/TextRecognitionCameraComponent';
import {getStickerData} from '_shared/helpers/getStickerData';
import OverlayLoaderComponent from 'components/OverlayLoader/OverlayLoader.component';

const ScanStickerScreen: FC<ScreenProps<'ScanSticker'>> = ({navigation}) => {
  const {album, stickerValueRegex, addNewStickers} = useContext(ConfigContext);
  const [detectedStickers, setDetectedStickers] = useState<string[]>([]);
  const [updatingAlbum, setUpdatingAlbum] = useState(false);

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
      const {stickerGroup, stickerNumber} = getStickerData(detectionArray[0]);
      return album[stickerGroup][stickerNumber].collected
        ? null
        : detectionArray[0];
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

  const handleScanFinished = () => {
    setUpdatingAlbum(true);

    addNewStickers(detectedStickers);

    setUpdatingAlbum(false);
  };

  return (
    <>
      <TextRecognitionCameraComponent
        type={'sticker'}
        detectedStickers={detectedStickers}
        onImageAnalyzed={onPictureAnalyzed}
        onStickerListElementClick={removeStickerFromList}
        onCancel={() => navigation.pop()}
        onConfirm={handleScanFinished}
      />
      {updatingAlbum && (
        <OverlayLoaderComponent label={'Ažuriranje albuma...'} />
      )}
    </>
  );
};

export default ScanStickerScreen;
