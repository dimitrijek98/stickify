import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Button, Modal, ScrollView, View} from 'react-native';
import {ScreenProps} from '_shared/types/ScreenProps';
import {getUniqueId} from 'react-native-device-info';
import BodyText from 'components/BodyText/BodyText.component';
import HeadingText from 'components/HeadingText/HeadingText.component';
import {settingsStyle} from 'screens/Settings/Settings.style';
import {APP_DANGER, APP_DARK, APP_PRIMARY} from '_shared/theme/appColors';
import QRCode from 'react-native-qrcode-svg';
import BarcodeScanning from '@react-native-ml-kit/barcode-scanning';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {ConfigContext} from 'services/Config.context';
import StatsComponent from 'components/Stats/Stats.component';

type ModalProps = {
  visible: boolean;
  type?: 'share' | 'scan';
};

const SettingsScreen: FC<ScreenProps<'Settings'>> = () => {
  const cameraDevice = useCameraDevice('back');
  const {album, setAlbumState} = useContext(ConfigContext);
  const camera = useRef<Camera>(null);
  const [scanError, setScanError] = useState('');
  const [scanningCode, setScanningCode] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
    visible: false,
    type: undefined,
  });
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    getUniqueId().then(id => setDeviceId(id));
  }, []);

  const handleQRCodeScanned = async () => {
    setScanningCode(true);
    const photo = await camera?.current?.takePhoto();
    const result = await BarcodeScanning.scan(`file://${photo?.path}`);
    setScanningCode(false);

    if (!result?.[0]?.value) {
      setScanError('Skeniranje nije uspelo, Probajte ponovo');
      return;
    }
    setModalProps({visible: false, type: undefined});
  };

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
              style={settingsStyle.cameraStyle}
              zoom={0}
              device={cameraDevice}
              photo={true}
              isActive={true}
            />
          )}

          <View style={settingsStyle.row}>
            {modalProps.type === 'scan' &&
              (scanningCode ? (
                <ActivityIndicator color={APP_PRIMARY} />
              ) : (
                <Button
                  title={'Skeniraj'}
                  color={APP_PRIMARY}
                  onPress={handleQRCodeScanned}
                />
              ))}

            <Button
              title={'Zatvori'}
              color={APP_DARK}
              onPress={() => setModalProps({visible: false, type: undefined})}
            />
          </View>

          {!!scanError && <BodyText color={'danger'}>{scanError}</BodyText>}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SettingsScreen;
