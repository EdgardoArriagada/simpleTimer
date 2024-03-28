import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';
import {formatSecondsToClock} from '../utils/time/time';
import {Button} from '../components/Button';

const INITIAL_SESSION_DURATION = 10;

type ReadySessionProps = {
  start: () => void;
};

const ReadySession: FC<ReadySessionProps> = ({start}) => {
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
      <Text>{formatSecondsToClock(INITIAL_SESSION_DURATION)}</Text>
      <Button onPress={start}>▶</Button>
    </View>
  );
};

export const SessionScreen: FC = () => {
  const [countdown, isRunning, start] = useCountdown(INITIAL_SESSION_DURATION);

  return (
    <View style={s.container}>
      {isRunning && <Text>{formatSecondsToClock(countdown)}</Text>}
      {!isRunning && <ReadySession start={start} />}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
