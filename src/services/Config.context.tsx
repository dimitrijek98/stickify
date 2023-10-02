import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import albumConfig from 'config/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStickerData} from '_shared/helpers/getStickerData';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
export type Sticker = {
  collected: boolean;
  label: string;
};

export type AlbumSection = Record<string, Sticker>;

export type Album = Record<string, AlbumSection>;

export type ConfigType = {
  stickerValueRegex: RegExp;
  stickerNumberRegex: RegExp;
  stickerGroupRegex: RegExp;
  album: Album;
  changeAlbumSection: (albumSection: AlbumSection, sectionName: string) => void;
  addNewStickers: (newStickers: string[]) => void;
  toggleStickerCollected: (sticker: string) => void;
  setAlbumState: (state: 'completed' | 'empty') => void;
};

const defaultRegex = /([A-Z])* (?:[1-9]|1[0-9])\b/g;

const defaultAlbum: Album = {};

const ALBUM_STORAGE_KEY = 'saved_album';

export const ConfigContext = createContext<ConfigType>({
  stickerValueRegex: defaultRegex,
  stickerNumberRegex: defaultRegex,
  stickerGroupRegex: defaultRegex,
  album: defaultAlbum,
  changeAlbumSection: () => {},
  addNewStickers: () => {},
  toggleStickerCollected: () => {},
  setAlbumState: () => {},
});

const ConfigContextProvider: FC<{children: ReactNode}> = ({children}) => {
  const {
    album,
    stickerValuesExpression,
    stickerNumbersExpression,
    stickerGroupExpression,
  } = albumConfig;
  const [stickerValueRegex, setStickerValueRegex] = useState(defaultRegex);
  const [stickerNumberRegex, setStickerNumberRegex] = useState(defaultRegex);
  const [stickerGroupRegex, setStickerGroupRegex] = useState(defaultRegex);
  const [albumData, setAlbumData] = useState<Album>(defaultAlbum);

  const getSavedAlbum = useCallback(async () => {
    const savedAlbum = await AsyncStorage.getItem(ALBUM_STORAGE_KEY);
    if (savedAlbum) {
      setAlbumData(JSON.parse(savedAlbum));
    } else {
      const emptyAlbum = _.cloneDeep(album);
      setAlbumData(emptyAlbum as Album);
    }
  }, [album]);

  const saveAlbumChanges = (newAlbum: Album) => {
    setAlbumData(newAlbum);

    AsyncStorage.setItem(ALBUM_STORAGE_KEY, JSON.stringify(newAlbum));
  };

  useEffect(() => {
    getSavedAlbum();
  }, [getSavedAlbum]);

  useEffect(() => {}, []);

  useEffect(() => {
    setStickerValueRegex(new RegExp(stickerValuesExpression, 'g'));
    setStickerNumberRegex(new RegExp(stickerNumbersExpression, 'g'));
    setStickerGroupRegex(new RegExp(stickerGroupExpression, 'g'));
  }, [
    stickerGroupExpression,
    stickerNumbersExpression,
    stickerValuesExpression,
  ]);

  const changeAlbumSection = (
    albumSection: AlbumSection,
    sectionName: string,
  ) => {
    const newAlbumData = _.cloneDeep(albumData);
    newAlbumData[sectionName] = albumSection;

    Toast.show({
      position: 'bottom',
      type: 'success',
      text1: 'Album azuriran',
      text2: `Uspešno ste azurirali ${sectionName}`,
    });

    saveAlbumChanges(newAlbumData);
  };

  const toggleStickerCollected = (sticker: string) => {
    const {stickerGroup, stickerNumber} = getStickerData(sticker);
    const newAlbum = _.cloneDeep(albumData);
    newAlbum[stickerGroup][stickerNumber].collected =
      !newAlbum[stickerGroup][stickerNumber].collected;

    saveAlbumChanges(newAlbum);
  };

  const addNewStickers = (newStickers: string[]) => {
    const newAlbum = _.cloneDeep(albumData);

    newStickers.forEach(sticker => {
      const {stickerGroup, stickerNumber} = getStickerData(sticker);
      newAlbum[stickerGroup][stickerNumber].collected = true;
    });

    Toast.show({
      position: 'bottom',
      type: 'success',
      text1: 'Sličice dodate',
      text2: `Uspešno ste dodali ${newStickers.length} sličica`,
    });

    saveAlbumChanges(newAlbum);
  };

  const setAlbumState = (state: 'completed' | 'empty') => {
    const customisedAlbum = _.cloneDeep(albumData);

    Object.keys(albumData).forEach(key => {
      Object.keys(albumData[key]).forEach(groupKey => {
        customisedAlbum[key][groupKey].collected = state === 'completed';
      });
    });

    if (state === 'empty') {
      Toast.show({
        position: 'bottom',
        type: 'success',
        text1: 'Album resetovan',
        text2: 'Uspešno ste resetovali album',
      });
    } else {
      Toast.show({
        position: 'bottom',
        type: 'success',
        text1: 'Album kompletiran',
        text2: 'Čestitamo! Sakupili ste sve sličice',
      });
    }
    saveAlbumChanges(customisedAlbum);
  };

  return (
    <ConfigContext.Provider
      value={{
        album: albumData,
        stickerValueRegex: stickerValueRegex,
        stickerNumberRegex: stickerNumberRegex,
        stickerGroupRegex: stickerGroupRegex,
        changeAlbumSection: changeAlbumSection,
        addNewStickers: addNewStickers,
        toggleStickerCollected: toggleStickerCollected,
        setAlbumState: setAlbumState,
      }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
