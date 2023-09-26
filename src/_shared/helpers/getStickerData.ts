export const getStickerData = (sticker: string) => {
  const [stickerGroup, stickerNumber] = sticker.split(' ');
  return {stickerGroup, stickerNumber};
};
