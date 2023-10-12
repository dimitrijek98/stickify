import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenProps} from '_shared/types/ScreenProps';
import {getUniqueId} from 'react-native-device-info';
import BodyText from 'components/BodyText/BodyText.component';
import HeadingText from 'components/HeadingText/HeadingText.component';
import {settingsStyle} from 'screens/Settings/Settings.style';
import {APP_DANGER, APP_PRIMARY} from '_shared/theme/appColors';
import QRCode from 'react-native-qrcode-svg';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {ConfigContext} from 'services/Config.context';
import StatsComponent from 'components/Stats/Stats.component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ModalProps = {
  visible: boolean;
  type?: 'share' | 'scan';
};

const SettingsScreen: FC<ScreenProps<'Settings'>> = () => {
  const cameraDevice = useCameraDevice('back');
  const {album, setAlbumState, setConnectedApp} = useContext(ConfigContext);
  const camera = useRef<Camera>(null);
  const [modalProps, setModalProps] = useState<ModalProps>({
    visible: false,
    type: undefined,
  });
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    getUniqueId().then(id => setDeviceId(id));
  }, []);

  const handleModalClose = () => {
    setModalProps({visible: false, type: undefined});
  };

  const handleQRCodeScanned = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (codes[0].value) {
        setConnectedApp(codes[0].value);
        handleModalClose();
      }
    },
  });

  return (
    <ScrollView contentContainerStyle={settingsStyle.container}>
      <View style={settingsStyle.section}>
        <View>
          <HeadingText size={'h2'}>Povezivanje sa drugima</HeadingText>
          <BodyText>Ostvarite sinhronizovanu evidenciju</BodyText>
        </View>

        <View style={settingsStyle.row}>
          <Button
            title={'Skenirajte kod'}
            color={APP_PRIMARY}
            onPress={() => setModalProps({visible: true, type: 'scan'})}
          />
          <Button
            title={'Prikažite svoj kod'}
            color={APP_PRIMARY}
            onPress={() => setModalProps({visible: true, type: 'share'})}
          />
        </View>
      </View>

      <View style={settingsStyle.section}>
        <StatsComponent album={album} />
      </View>

      <View style={settingsStyle.section}>
        <View>
          <HeadingText size={'h2'}>Resetujte album</HeadingText>
          <BodyText>Ovom akcijom ćete vratiti album na prazno stanje</BodyText>
        </View>

        <Button
          title={'Resetuj'}
          color={APP_DANGER}
          onPress={() => setAlbumState('empty')}
        />
      </View>

      <View style={settingsStyle.section}>
        <View>
          <HeadingText size={'h2'}>Označi album kao kompletiran</HeadingText>
          <BodyText>
            Ako ste sakupili sve sličice, možete označiti album kao kompletiran.
            Ovime će sve sličice u aplikaciji biti označene kao sakupljene
          </BodyText>
        </View>

        <Button
          title={'Kompletiraj album'}
          color={APP_PRIMARY}
          onPress={() => setAlbumState('completed')}
        />
      </View>

      <Modal
        visible={modalProps.visible}
        transparent={false}
        animationType={'slide'}>
        <View style={settingsStyle.modalContainer}>
          {modalProps.type === 'share' && (
            <>
              <HeadingText size={'h2'} style={settingsStyle.modalText}>
                Koristite ovaj kod za povezivanje sa drugim korisnicima
              </HeadingText>

              <QRCode value={deviceId} size={250} quietZone={10} />
            </>
          )}

          {cameraDevice && modalProps.type === 'scan' && (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              zoom={0}
              device={cameraDevice}
              codeScanner={handleQRCodeScanned}
              photo={true}
              isActive={true}
            />
          )}

          <TouchableOpacity
            onPress={handleModalClose}
            style={settingsStyle.closeButton}>
            <MaterialIcons name={'close'} size={30} color={'white'} />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SettingsScreen;
