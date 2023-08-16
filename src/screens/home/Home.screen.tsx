import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './Home.style';
import images from 'assets/images';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.world_cup_logo} style={styles.logoImage} />
      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.tile}>
          <MaterialIcons name={'auto-stories'} color={'#fff'} size={50} />
          <Text style={styles.cardText}>Album</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile}>
          <MaterialIcons name={'add-a-photo'} color={'#fff'} size={50} />
          <Text style={styles.cardText}>Skeniraj album</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile}>
          <MaterialIcons name={'image-search'} color={'#fff'} size={50} />
          <Text style={styles.cardText}>Skeniraj slicicu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile}>
          <MaterialIcons name={'settings'} color={'#fff'} size={50} />
          <Text style={styles.cardText}>Opcije</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
