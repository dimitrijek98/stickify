import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Album: undefined;
  ScanAlbum: undefined;
  ScanSticker: undefined;
  Settings: undefined;
};

export type ScreenProps<screenKey extends keyof RootStackParamList = 'Home'> =
  NativeStackScreenProps<RootStackParamList, screenKey>;
