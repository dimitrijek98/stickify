import {StyleSheet} from 'react-native';

export const cameraStyles = StyleSheet.create({
  buttonRow: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
  },
  shutterButton: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedStickersContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
  },
  selectedSticker: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    marginEnd: 5,
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
  },
  removeSticker: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    paddingHorizontal: 3,
    marginStart: 2,
  },
});
