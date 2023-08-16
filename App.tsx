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
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import AlbumPage from 'screens/Album/Album.page';
import {RootStackParamList} from '_shared/types/ScreenProps';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        </Stack.Navigator>
      </NavigationContainer>
    </ConfigContextProvider>
  );
}

export default App;
