import {FC, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';
import {formatSecondsToClock} from '../utils/time/time';
import {Button} from '../components/Button';
import {useMemoizedClock, useSessionStore} from '../store/session-store';
import soundAsset from '../assets/xylofon.wav';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';

Sound.setCategory('Alarm');

const sound = new Sound(soundAsset, Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

type ReadySessionProps = {
  start: () => void;
  time: string;
};

const ReadySession: FC<ReadySessionProps> = ({start, time}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        padding: 10,
      }}>
      <Text>{time}</Text>

      <Button
        onPress={start}
        renderIcon={({style}) => (
          <Icon style={style} name="play" size={30} color="#900" />
        )}
      />
    </View>
  );
};

const RepeatsLogList: FC<{repeatsLog: string[]}> = ({repeatsLog}) => {
  return useMemo(() => {
    return (
      <View>
        {repeatsLog.map((repeat, index) => (
          <Text key={index}>{repeat}</Text>
        ))}
      </View>
    );
  }, [repeatsLog]);
};

const SerieLogList: FC<{seriesLog: string[]}> = ({seriesLog}) => {
  return useMemo(() => {
    return (
      <View>
        {seriesLog.map((serie, index) => (
          <Text key={index}>{serie}</Text>
        ))}
      </View>
    );
  }, [seriesLog]);
};

const isGoingToFinishSerie = (repeatsLogs: string[], repeats: number) =>
  repeatsLogs.length + 1 === repeats;

export const SessionScreen: FC = () => {
  const [repeatsLog, setRepeatsLog] = useState<string[]>([]);
  const [seriesLog, setSeriesLog] = useState<string[]>([]);

  const seconds = useSessionStore(state => state.seconds);
  const time = useMemoizedClock();
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

  return (
    <View style={s.container}>
      <SerieLogList seriesLog={seriesLog} />
      <RepeatsLogList repeatsLog={repeatsLog} />
      {isRunning && <Text>{formatSecondsToClock(countdown)}</Text>}
      {!isRunning && <ReadySession start={() => start(seconds)} time={time} />}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
