import {Sticker} from 'services/Config.context';
import React, {FC, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {stickerItemStyles} from 'components/StickerItem/StickerItem.styles';

type StickerProps = {
  sticker: Sticker;
  stickerNumber: string;
};

const StickerItem: FC<StickerProps> = ({sticker, stickerNumber}) => {
  const [collected, setCollected] = useState(sticker.collected);

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
      onPress={() => setCollected(!collected)}
      style={stickerStyle}>
      <Text style={stickerItemStyles.stickerLabel}>{stickerNumber}</Text>
    </TouchableOpacity>
  );
};

export default StickerItem;
