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
      setAlbumData(album as Album);
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
    const newAlbumData = {...albumData};
    newAlbumData[sectionName] = albumSection;
    saveAlbumChanges(newAlbumData);
  };

  const toggleStickerCollected = (sticker: string) => {
    const {stickerGroup, stickerNumber} = getStickerData(sticker);
    const newAlbum = {...albumData};
    newAlbum[stickerGroup][stickerNumber].collected =
      !newAlbum[stickerGroup][stickerNumber].collected;

    saveAlbumChanges(newAlbum);
  };

  const addNewStickers = (newStickers: string[]) => {
    const newAlbum = {...albumData};

    newStickers.forEach(sticker => {
      toggleStickerCollected(sticker);
    });

    saveAlbumChanges(newAlbum);
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
      }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
