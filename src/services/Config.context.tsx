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
import firestore from '@react-native-firebase/firestore';
import {getStickerData} from '_shared/helpers/getStickerData';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import {getUniqueId} from 'react-native-device-info';
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
  albumKeysOrder: string[];
  changeAlbumSection: (albumSection: AlbumSection, sectionName: string) => void;
  addNewStickers: (newStickers: string[]) => void;
  toggleStickerCollected: (sticker: string) => void;
  setAlbumState: (state: 'completed' | 'empty') => void;
  setConnectedApp: (connectedAppId: string) => void;
};

const defaultRegex = /([A-Z])* (?:[1-9]|1[0-9])\b/g;

const defaultAlbum: Album = {};

const ALBUM_STORAGE_KEY = 'saved_album';
const CONNECTED_APP_ID = 'connected_app_id';

export const ConfigContext = createContext<ConfigType>({
  stickerValueRegex: defaultRegex,
  stickerNumberRegex: defaultRegex,
  stickerGroupRegex: defaultRegex,
  album: defaultAlbum,
  albumKeysOrder: [],
  changeAlbumSection: () => {},
  addNewStickers: () => {},
  toggleStickerCollected: () => {},
  setAlbumState: () => {},
  setConnectedApp: () => {},
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
  const [albumKeyOrder, setAlbumKeyOrder] = useState<string[]>([]);
  const [connectedAppId, setConnectedAppId] = useState('');

  const getSavedAlbum = useCallback(async () => {
    setAlbumKeyOrder(Object.keys(album));
    const savedAlbum = await AsyncStorage.getItem(ALBUM_STORAGE_KEY);
    if (savedAlbum) {
      saveAlbumChanges(JSON.parse(savedAlbum));
    } else {
      const emptyAlbum = _.cloneDeep(album);
      saveAlbumChanges(emptyAlbum as Album);
    }
  }, [album]);

  useEffect(() => {
    getSavedAlbum();
    AsyncStorage.getItem(CONNECTED_APP_ID).then(key => {
      if (key) {
        setConnectedAppId(key);
      }
    });
  }, [getSavedAlbum]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(connectedAppId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot?.data()) {
          saveAlbumChanges(documentSnapshot.data() as Album);
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [album, connectedAppId]);

  useEffect(() => {
    setStickerValueRegex(new RegExp(stickerValuesExpression, 'g'));
    setStickerNumberRegex(new RegExp(stickerNumbersExpression, 'g'));
    setStickerGroupRegex(new RegExp(stickerGroupExpression, 'g'));
  }, [
    stickerGroupExpression,
    stickerNumbersExpression,
    stickerValuesExpression,
  ]);

  const saveAlbumChanges = (newAlbum: Album) => {
    setAlbumData(newAlbum);

    AsyncStorage.setItem(ALBUM_STORAGE_KEY, JSON.stringify(newAlbum));
    getUniqueId().then(id => {
      firestore().collection('Users').doc(id).set(newAlbum);
    });
  };

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

  const setConnectedApp = (appId: string) => {
    setConnectedAppId(appId);
    AsyncStorage.setItem(CONNECTED_APP_ID, appId);
    Toast.show({
      position: 'bottom',
      type: 'success',
      text1: 'Album povezan',
      text2: 'Uspešno ste povezali album sa drugim korisnikom',
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        album: albumData,
        albumKeysOrder: albumKeyOrder,
        stickerValueRegex: stickerValueRegex,
        stickerNumberRegex: stickerNumberRegex,
        stickerGroupRegex: stickerGroupRegex,
        changeAlbumSection: changeAlbumSection,
        addNewStickers: addNewStickers,
        toggleStickerCollected: toggleStickerCollected,
        setAlbumState: setAlbumState,
        setConnectedApp: setConnectedApp,
      }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
