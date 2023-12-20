import React, {FC, useContext, useState} from 'react';
import TextRecognitionCameraComponent from 'components/TextRecognitionCamera/TextRecognitionCameraComponent';
import {
  TextBlock,
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';
import {trimLineBreaks} from '_shared/helpers/trimLineBreaks';
import {AlbumContext} from 'services/AlbumContext';
import {ScreenProps} from '_shared/types/ScreenProps';
import {getStickerData} from '_shared/helpers/getStickerData';
import {getAlbumGroup} from '_shared/helpers/getAlbumData';
import OverlayLoaderComponent from 'components/OverlayLoader/OverlayLoader.component';
import {componseStickerValue} from '_shared/helpers/componseStickerValue';

const ScanAlbumScreen: FC<ScreenProps<'ScanAlbum'>> = ({navigation}) => {
  const {
    album,
    stickerValueRegex,
    stickerNumberRegex,
    stickerGroupRegex,
    changeAlbumSection,
  } = useContext(AlbumContext);
  const [detectedStickers, setDetectedStickers] = useState<string[]>([]);
  const [detectedStickerGroup, setDetectedStickerGroup] = useState('');
  const [updatingAlbum, setUpdatingAlbum] = useState(false);

  const sortStickerList = (stickerList: string[]) => {
    return stickerList.sort((s1, s2) => {
      const s1Number = s1.split(' ')[1];
      const s2Number = s2.split(' ')[1];

      return +s1Number - +s2Number;
    });
  };

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

    setDetectedStickers(sortStickerList(newStickersList));
  };

  const detectStickerGroup = (textBlock: string) => {
    const group = textBlock.match(stickerGroupRegex);
    if (group) {
      return group[0];
    }
  };

  const analyzeTextBlock = (
    textBlock: TextBlock,
    stickerGroup: string,
  ): string | null => {
    const formattedBlock = trimLineBreaks(textBlock.text);

    const [bp1, bp2] = formattedBlock.split(' ');
    const detectionArray = formattedBlock.match(stickerValueRegex);
    if (detectionArray && bp1 === stickerGroup) {
      return detectionArray[0];
    }

    if (
      bp1?.match(stickerNumberRegex) &&
      bp2?.match(stickerGroupRegex) &&
      bp2 === stickerGroup
    ) {
      return componseStickerValue(bp2, bp1);
    }

    if (!bp2 && bp1?.match(stickerNumberRegex)) {
      return componseStickerValue(stickerGroup, bp1);
    }

    return null;
  };

  const onPictureAnalyzed = (result: TextRecognitionResult) => {
    let stickerGroup = detectedStickerGroup;
    if (!detectedStickerGroup) {
      const group = detectStickerGroup(result.text) ?? '';
      stickerGroup = group;
      setDetectedStickerGroup(group);
    }

    const analysedBlocks = result.blocks.map(block =>
      analyzeTextBlock(block, stickerGroup),
    );

    addDetectedStickers(analysedBlocks);
  };

  const removeStickerFromList = (stickerToRemove: string) => {
    setDetectedStickers(
      detectedStickers.filter(sticker => sticker !== stickerToRemove),
    );
  };

  const handleScanFinished = () => {
    setUpdatingAlbum(true);
    const {stickerGroup} = getStickerData(detectedStickers[0]);

    const albumGroup = getAlbumGroup(album, stickerGroup);

    const missingNumbers = detectedStickers.map(
      sticker => getStickerData(sticker).stickerNumber,
    );

    Object.keys(albumGroup).forEach(key => {
      albumGroup[key].collected = !missingNumbers.includes(key);
    });

    changeAlbumSection(albumGroup, stickerGroup);
    setDetectedStickers([]);
    setDetectedStickerGroup('');

    setUpdatingAlbum(false);
  };

  return (
    <>
      <TextRecognitionCameraComponent
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

export default ScanAlbumScreen;
