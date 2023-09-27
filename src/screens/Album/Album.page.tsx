import React, {FC, useContext} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {ConfigContext} from 'services/Config.context';
import {ScreenProps} from '_shared/types/ScreenProps';
import AlbumSectionList from 'components/AlbumSectionList/AlbumSectionList';

const AlbumPage: FC<ScreenProps<'Album'>> = () => {
  const {album} = useContext(ConfigContext);

  return (
    <SafeAreaView>
      <FlatList
        data={Object.entries(album)}
        keyExtractor={item => {
          const [sectionKey] = item;
          return sectionKey;
        }}
        renderItem={({item}) => {
          const [sectionKey, albumSection] = item;
          return (
            <AlbumSectionList section={albumSection} sectionName={sectionKey} />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default AlbumPage;
