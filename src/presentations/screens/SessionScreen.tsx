import {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {formatSecondsToClock} from '../utils/time/time';
import {Button} from '../components/Button';
import {
  useMemoizedClock,
  useSessionStore,
  useUnmountInterval,
} from '../store/session-store';
// @ts-ignore
import soundAsset from '../assets/xylofon.wav';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppModal, ModalContent, ModalFooter} from '../components/AppModal';
import {gs} from '../../config/theme';

Sound.setCategory('Alarm');

const sound = new Sound(soundAsset, Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

const Controls: FC = () => {
  const isRunning = useSessionStore(state => state.isRunning);
  const startCountdown = useSessionStore(state => state.startCountdown);
  const showClearModal = useSessionStore(state => state.showClearModal);
  const seconds = useSessionStore(state => state.seconds);

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
      }}>
      <Button
        secondary
        disabled={isRunning}
        onPress={showClearModal}
        renderIcon={({style}) => <Icon style={style} name="trash" size={30} />}
      />

      <Text>{formatSecondsToClock(seconds)}</Text>

      <Button
        disabled={isRunning}
        onPress={() => startCountdown(seconds)}
        renderIcon={({style}) => <Icon style={style} name="play" size={30} />}
      />
    </View>
  );
};

const SerieLogList: FC = () => {
  const seriesLog = useSessionStore(state => state.seriesLog);

  return (
    <View>
      {seriesLog.map((serie, index) => (
        <Text style={gs.seriesLog} key={index}>
          {serie}
        </Text>
      ))}
    </View>
  );
};

const RepeatsLogList: FC = () => {
  const repeatsLog = useSessionStore(state => state.repeatsLog);

  return (
    <View>
      {repeatsLog.map((repeat, index) => (
        <Text style={gs.repeatsLog} key={index}>
          {repeat}
        </Text>
      ))}
    </View>
  );
};

const ConfirmModal: FC = () => {
  const isClearModalVisible = useSessionStore(
    state => state.isClearModalVisible,
  );
  const hideClearModal = useSessionStore(state => state.hideClearModal);
  const clearSession = useSessionStore(state => state.clearSession);

  const onConfirm = () => {
    clearSession();
    hideClearModal();
  };

  return (
    <AppModal visible={isClearModalVisible} onRequestClose={hideClearModal}>
      <ModalContent>
        <Text
          style={{
            marginTop: 20,
          }}>
          Are you sure you want to clear the session?
        </Text>
        <ModalFooter
          style={{
            marginTop: 50,
          }}>
          <Button onPress={onConfirm}>Clear</Button>
          <Button secondary onPress={hideClearModal}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </AppModal>
  );
};

const Countdown: FC = () => {
  const isRunning = useSessionStore(state => state.isRunning);
  const countdown = useSessionStore(state => state.countdown);

  useUnmountInterval();

  useEffect(() => {
    return () => {
      if (countdown <= 1 && isRunning) {
        sound.play();
      }
    };
  }, [countdown, isRunning]);

  if (!isRunning) return null;

  return <Text style={gs.countdown}>{formatSecondsToClock(countdown)}</Text>;
};

export const SessionScreen: FC = () => {
  return (
    <View style={s.container}>
      <View style={gs.repeatsLogContainer}>
        <SerieLogList />
      </View>
      <View style={gs.seriesLogContainer}>
        <RepeatsLogList />
      </View>
      <ConfirmModal />
      <View style={gs.footer}>
        <Countdown />
        <Controls />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
