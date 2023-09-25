import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import {AVAILABLE_VALUES} from '_shared/helpers/trimLineBreaks';
import album from '_shared/helpers/config.json';

export type Sticker = {
  collected: boolean;
  label: string;
};

export type AlbumSection = Record<string, Sticker>;

export type Album = Record<string, AlbumSection>;

export type ConfigType = {
  stickerNumberRegex: RegExp;
  album: Album;
};

const defaultRegex = /([A-Z])* (?:[1-9]|1[0-9])\b/g;

const defaultAlbum: Album = {};

export const ConfigContext = createContext<ConfigType>({
  stickerNumberRegex: defaultRegex,
  album: defaultAlbum,
});

const ConfigContextProvider: FC<{children: ReactNode}> = ({children}) => {
  const [stickerNumberRegex, setStickerNumberRegex] = useState(defaultRegex);
  const [albumData, setAlbumData] = useState(defaultAlbum);

  useEffect(() => {
    setAlbumData(album);
    setStickerNumberRegex(AVAILABLE_VALUES);
  }, []);

  return (
    <ConfigContext.Provider
      value={{stickerNumberRegex: stickerNumberRegex, album: albumData}}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
