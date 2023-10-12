import {StyleSheet} from 'react-native';
import {APP_GRAY} from '_shared/theme/appColors';

export const settingsStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 20,
  },
  section: {
    padding: 10,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalContainer: {
    backgroundColor: APP_GRAY,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 50,
  },
  cameraStyle: {
    position: 'relative',
    width: 250,
    height: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalText: {textAlign: 'center'},
});
