import {Album} from 'services/Config.context';

export const getAlbumGroup = (album: Album, stickerGroup: string) => {
  return album[stickerGroup];
};
