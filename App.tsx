/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import HomeScreen from 'screens/home/Home.screen';
import ConfigContextProvider from 'services/Config.context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AlbumPage from 'screens/Album/Album.page';
import {RootStackParamList} from '_shared/types/ScreenProps';
import ScanAlbumScreen from 'screens/ScanAlbum/ScanAlbum.screen';
import ScanStickerScreen from 'screens/ScanSticker/ScanSticker.screen';
import SettingsScreen from 'screens/Settings/Settings.screen';
import Toast, {BaseToast, ToastConfig} from 'react-native-toast-message';
import {APP_PRIMARY} from '_shared/theme/appColors';

const Stack = createNativeStackNavigator<RootStackParamList>();
const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast {...props} style={{borderLeftColor: APP_PRIMARY}} />
  ),
};
function App(): JSX.Element {
  return (
    <ConfigContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Album" component={AlbumPage} />

          <Stack.Screen
            options={{headerShown: false}}
            name="ScanAlbum"
            component={ScanAlbumScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ScanSticker"
            component={ScanStickerScreen}
          />
          <Stack.Screen
            options={{headerShown: true, headerTitle: 'Opcije'}}
            name="Settings"
            component={SettingsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </ConfigContextProvider>
  );
}

export default App;
