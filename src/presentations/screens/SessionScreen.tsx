import {FC, memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';
import {formatSecondsToClock} from '../utils/time/time';
import {Button} from '../components/Button';
import {useMemoizedClock, useSessionStore} from '../store/session-store';
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

type ReadySessionProps = {
  onStart: () => void;
  onClear: () => void;
  isRunning: boolean;
};

const Controls: FC<ReadySessionProps> = memo(
  ({onStart, onClear, isRunning}) => {
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
        <Text>{time}</Text>

        <Button
          disabled={isRunning}
          onPress={onStart}
          renderIcon={({style}) => <Icon style={style} name="play" size={30} />}
        />

        <Button
          disabled={isRunning}
          onPress={onClear}
          renderIcon={({style}) => (
            <Icon style={style} name="trash" size={30} />
          )}
        />
      </View>
    );
  },
);

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

type ConfirmModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  onClear: () => void;
  onCancel: () => void;
};

const ConfirmModal: FC<ConfirmModalProps> = memo(
  ({visible, onRequestClose, onClear, onCancel}) => {
    return (
      <AppModal visible={visible} onRequestClose={onRequestClose}>
        <ModalContent>
          <Text>Are you sure you want to clear the session?</Text>
          <ModalFooter
            style={{
              marginTop: 50,
            }}>
            <Button onPress={onClear}>Clear</Button>
            <Button secondary onPress={onCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </AppModal>
    );
  },
);

const isGoingToFinishSerie = (repeatsLogs: string[], repeats: number) =>
  repeatsLogs.length + 1 === repeats;

export const SessionScreen: FC = () => {
  const [isClearModalVisible, showClearModal, hideClearModal] =
    useBoolean(false);

  const [repeatsLog, setRepeatsLog] = useState<string[]>([]);
  const [seriesLog, setSeriesLog] = useState<string[]>([]);

  const seconds = useSessionStore(state => state.seconds);
  const repeats = useSessionStore(state => state.repeats);

  const [countdown, isRunning, start] = useCountdown(startSeconds => {
    if (isGoingToFinishSerie(repeatsLog, repeats)) {
      setSeriesLog([...seriesLog, `Serie of ${repeats} repeats finished`]);
      setRepeatsLog([]);
    } else {
      setRepeatsLog([...repeatsLog, formatSecondsToClock(startSeconds)]);
    }
    sound.play();
  });

  const startCountdown = useCallback(() => {
    start(seconds);
  }, [seconds, start]);

  const handleOnClear = useCallback(() => {
    hideClearModal();
    setRepeatsLog([]);
    setSeriesLog([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={s.container}>
      <SerieLogList seriesLog={seriesLog} />
      <RepeatsLogList repeatsLog={repeatsLog} />
      {isRunning && <Text>{formatSecondsToClock(countdown)}</Text>}
      <Controls
        isRunning={isRunning}
        onStart={startCountdown}
        onClear={showClearModal}
      />
      <ConfirmModal
        visible={isClearModalVisible}
        onRequestClose={hideClearModal}
        onClear={handleOnClear}
        onCancel={hideClearModal}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
