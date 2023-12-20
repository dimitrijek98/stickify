import {Album} from 'services/AlbumContext';

export const getAlbumGroup = (album: Album, stickerGroup: string) => {
  return album[stickerGroup];
};
