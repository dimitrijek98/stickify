import React, {FC, useMemo} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './Home.style';
import images from 'assets/images';
import {RootStackParamList, ScreenProps} from '_shared/types/ScreenProps';

type HomeButtonType = {
  navigationKey: keyof RootStackParamList;
  icon: string;
  title: string;
};

const HomeScreen: FC<ScreenProps> = ({navigation}) => {
  const homeScreenNavigationButtons: HomeButtonType[] = useMemo(
    () => [
      {navigationKey: 'Album', icon: 'auto-stories', title: 'Album'},
      {
        navigationKey: 'ScanAlbum',
        icon: 'add-a-photo',
        title: 'Skeniraj album',
      },
      {
        navigationKey: 'ScanSticker',
        icon: 'image-search',
        title: 'Skeniraj sličicu',
      },
      {navigationKey: 'Settings', icon: 'settings', title: 'Opcije'},
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.world_cup_logo} style={styles.logoImage} />
      <View style={styles.cardsContainer}>
        {homeScreenNavigationButtons.map(button => (
          <TouchableOpacity
            key={button.navigationKey}
            onPress={() => navigation.push(button.navigationKey)}
            style={styles.tile}>
            <MaterialIcons name={button.icon} color={'#fff'} size={50} />
            <Text style={styles.cardText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
