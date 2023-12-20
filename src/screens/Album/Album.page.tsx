import React, {FC, useContext, useMemo} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {AlbumSection, AlbumContext} from 'services/AlbumContext';
import {ScreenProps} from '_shared/types/ScreenProps';
import AlbumSectionList from 'components/AlbumSectionList/AlbumSectionList';

const AlbumPage: FC<ScreenProps<'Album'>> = () => {
  const {album, albumKeysOrder} = useContext(AlbumContext);
  const data = useMemo(() => {
    const returnData: [string, AlbumSection][] = [];
    albumKeysOrder.forEach(key => {
      returnData.push([key, album[key]]);
    });
    return returnData;
  }, [album, albumKeysOrder]);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
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
