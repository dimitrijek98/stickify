import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import albumConfig from 'config/config.json';
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
  const [stickerGroupRegex, setStickeGroupRegex] = useState(defaultRegex);
  const [albumData, setAlbumData] = useState<Album>(defaultAlbum);

  useEffect(() => {
    setAlbumData(album as Album);
    setStickerValueRegex(new RegExp(stickerValuesExpression, 'g'));
    setStickerNumberRegex(new RegExp(stickerNumbersExpression, 'g'));
    setStickeGroupRegex(new RegExp(stickerGroupExpression, 'g'));
  }, [
    album,
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
    setAlbumData(newAlbumData);
  };

  const toggleStickerCollected = (sticker: string) => {
    const {stickerGroup, stickerNumber} = getStickerData(sticker);
    const newAlbum = {...albumData};
    newAlbum[stickerGroup][stickerNumber].collected =
      !newAlbum[stickerGroup][stickerNumber].collected;

    setAlbumData(newAlbum);
  };

  const addNewStickers = (newStickers: string[]) => {
    const newAlbum = {...albumData};

    newStickers.forEach(sticker => {
      toggleStickerCollected(sticker);
    });

    setAlbumData(newAlbum);
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
