import {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';
import {formatSecondsToClock} from '../utils/time/time';
import {Button} from '../components/Button';
import {useMemoizedClock, useSessionStore} from '../store/session-store';

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
      <Button onPress={start}>▶</Button>
    </View>
  );
};

export const SessionScreen: FC = () => {
  const [repeats, setRepeats] = useState<string[]>([]);

  const seconds = useSessionStore(state => state.seconds);
  const time = useMemoizedClock();

  const [countdown, isRunning, start] = useCountdown(startSeconds => {
    setRepeats([...repeats, formatSecondsToClock(startSeconds)]);
  });

  return (
    <View style={s.container}>
      {repeats.map((repeat, index) => (
        <Text style={{fontSize: 20}} key={index}>
          {repeat}
        </Text>
      ))}
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
