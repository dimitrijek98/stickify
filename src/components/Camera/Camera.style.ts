import {StyleSheet} from 'react-native';

export const cameraStyles = StyleSheet.create({
  shutterButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  selectedStickersContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
  },
  selectedSticker: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginEnd: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
  },
});
