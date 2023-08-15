import {StyleSheet} from 'react-native';
import {APP_GRAY, APP_PRIMARY} from '../../_shared/theme/appColors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    backgroundColor: APP_GRAY,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logoImage: {
    height: 200,
    resizeMode: 'contain',
  },
  tile: {
    width: '45%',
    height: 180,
    margin: 5,
    borderRadius: 7,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: APP_PRIMARY,
  },
  cardText: {
    color: 'white',
    fontSize: 20,
  },
});

export default styles;
