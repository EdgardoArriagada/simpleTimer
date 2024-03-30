import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';
import {formatSecondsToClock} from '../utils/time/time';
import {Button} from '../components/Button';
import {useSessionStore} from '../store/session-store';

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
  const seconds = useSessionStore(state => state.getTimeAsSeconds());
  const time = useSessionStore(state => state.time);
  const [countdown, isRunning, start] = useCountdown();

  return (
    <View style={s.container}>
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
