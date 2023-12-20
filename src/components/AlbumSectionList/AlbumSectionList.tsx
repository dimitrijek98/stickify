import {AlbumSection, AlbumContext} from 'services/AlbumContext';
import React, {FC, useContext} from 'react';
import {ScrollView, Text, View} from 'react-native';
import StickerItem from 'components/StickerItem/StickerItem.component';
import {albumSectionListStyles} from 'components/AlbumSectionList/AlbumSectionList.styles';
import {componseStickerValue} from '_shared/helpers/componseStickerValue';

type AlbumSectionProps = {
  section: AlbumSection;
  sectionName: string;
};

const AlbumSectionList: FC<AlbumSectionProps> = ({section, sectionName}) => {
  const {toggleStickerCollected} = useContext(AlbumContext);

  const handleOnStickerClick = (stickerNumber: string) => {
    toggleStickerCollected(componseStickerValue(sectionName, stickerNumber));
  };

  return (
    <ScrollView contentContainerStyle={albumSectionListStyles.sectionContainer}>
      <Text style={albumSectionListStyles.sectionTitle}>{sectionName}</Text>
      <View style={albumSectionListStyles.sectionList}>
        {Object.entries(section).map(entry => {
          const [stickerNumber, sticker] = entry;
          return (
            <StickerItem
              key={`${sectionName}-${stickerNumber}`}
              sticker={sticker}
              stickerNumber={stickerNumber}
              onStickerClick={handleOnStickerClick}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AlbumSectionList;
