import {AlbumSection} from 'services/Config.context';
import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import StickerItem from 'components/StickerItem/StickerItem.component';
import {albumSectionListStyles} from 'components/AlbumSectionList/AlbumSectionList.styles';

type AlbumSectionProps = {
  section: AlbumSection;
  sectionName: string;
};

const AlbumSectionList: FC<AlbumSectionProps> = ({section, sectionName}) => {
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
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AlbumSectionList;
