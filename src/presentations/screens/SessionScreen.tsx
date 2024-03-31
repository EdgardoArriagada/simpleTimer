import {FC, memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';
import {formatSecondsToClock} from '../utils/time/time';
import {Button} from '../components/Button';
import {useMemoizedClock, useSessionStore} from '../store/session-store';
// @ts-ignore
import soundAsset from '../assets/xylofon.wav';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppModal, ModalContent, ModalFooter} from '../components/AppModal';
import {useBoolean} from '../hooks/useBoolean';

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
  const time = useMemoizedClock();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
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

      <Text>{time}</Text>

      <Button
        disabled={isRunning}
        onPress={() => startCountdown(seconds)}
        renderIcon={({style}) => <Icon style={style} name="play" size={30} />}
      />
    </View>
  );
};

const RepeatsLogList: FC<{repeatsLog: string[]}> = memo(({repeatsLog}) => {
  return (
    <View>
      {repeatsLog.map((repeat, index) => (
        <Text key={index}>{repeat}</Text>
      ))}
    </View>
  );
});

const SerieLogList: FC<{seriesLog: string[]}> = memo(({seriesLog}) => {
  return (
    <View>
      {seriesLog.map((serie, index) => (
        <Text key={index}>{serie}</Text>
      ))}
    </View>
  );
});

const ConfirmModal: FC = () => {
  const isClearModalVisible = useSessionStore(
    state => state.isClearModalVisible,
  );
  const hideClearModal = useSessionStore(state => state.hideClearModal);
  const clearSession = useSessionStore(state => state.clearSession);

  return (
    <AppModal visible={isClearModalVisible} onRequestClose={hideClearModal}>
      <ModalContent>
        <Text>Are you sure you want to clear the session?</Text>
        <ModalFooter
          style={{
            marginTop: 50,
          }}>
          <Button onPress={clearSession}>Clear</Button>
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

  useEffect(() => {
    if (countdown <= 0 && !isRunning) {
      sound.play();
    }
  }, [countdown, isRunning]);

  if (!isRunning) return null;

  return <Text>{formatSecondsToClock(countdown)}</Text>;
};

export const SessionScreen: FC = () => {
  const seriesLog = useSessionStore(state => state.seriesLog);
  const repeatsLog = useSessionStore(state => state.repeatsLog);

  return (
    <View style={s.container}>
      <SerieLogList seriesLog={seriesLog} />
      <RepeatsLogList repeatsLog={repeatsLog} />
      <Countdown />
      <Controls />
      <ConfirmModal />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
