import React, {FC, useContext, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AlbumSection, ConfigContext, Sticker} from 'services/Config.context';
import {albumStyles} from 'screens/Album/Album.styles';
import {ScreenProps} from '_shared/types/ScreenProps';

const AlbumPage: FC<ScreenProps<'Album'>> = () => {
  const config = useContext(ConfigContext);

  return (
    <SafeAreaView>
      <FlatList
        data={Object.entries(config.album)}
        renderItem={({item, index}) => {
          const [sectionKey, albumSection] = item;
          return (
            <AlbumSectionList
              key={index.toString()}
              section={albumSection}
              sectionName={sectionKey}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default AlbumPage;

type AlbumSectionProps = {
  section: AlbumSection;
  sectionName: string;
};

const AlbumSectionList: FC<AlbumSectionProps> = ({section, sectionName}) => {
  return (
    <ScrollView contentContainerStyle={albumStyles.sectionContainer}>
      <Text style={albumStyles.sectionTitle}>{sectionName}</Text>
      <View style={albumStyles.sectionList}>
        {Object.entries(section).map(entry => {
          const [stickerNumber, sticker] = entry;
          return (
            <StickerItem sticker={sticker} stickerNumber={stickerNumber} />
          );
        })}
      </View>
    </ScrollView>
  );
};

type StickerProps = {
  sticker: Sticker;
  stickerNumber: string;
};

const StickerItem: FC<StickerProps> = ({sticker, stickerNumber}) => {
  const [selected, setSelected] = useState(sticker.collected);
  return (
    <TouchableOpacity
      onPress={() => setSelected(!selected)}
      style={[
        albumStyles.stickerItem,
        selected ? albumStyles.collectedStickerItem : {},
      ]}>
      <Text>{stickerNumber}</Text>
    </TouchableOpacity>
  );
};
