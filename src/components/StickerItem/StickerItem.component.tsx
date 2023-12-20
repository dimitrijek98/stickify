import {Sticker} from 'services/AlbumContext';
import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {stickerItemStyles} from 'components/StickerItem/StickerItem.styles';

type StickerProps = {
  sticker: Sticker;
  stickerNumber: string;
  onStickerClick: (stickerNumber: string) => void;
};

const StickerItem: FC<StickerProps> = ({
  sticker,
  stickerNumber,
  onStickerClick,
}) => {
  const {collected} = sticker;
  const stickerStyle = useMemo(
    () =>
      collected
        ? StyleSheet.compose(
            stickerItemStyles.stickerItem,
            stickerItemStyles.collectedStickerItem,
          )
        : stickerItemStyles.stickerItem,
    [collected],
  );

  return (
    <TouchableOpacity
      onPress={() => onStickerClick(stickerNumber)}
      style={stickerStyle}>
      <Text style={stickerItemStyles.stickerLabel}>{stickerNumber}</Text>
    </TouchableOpacity>
  );
};

export default StickerItem;
