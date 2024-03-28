import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';
import {formatSecondsToClock} from '../utils/time/time';
import {Button} from '../components/Button';

export const SessionScreen: FC = () => {
  const [countdown, isRunning, start] = useCountdown(10);

  return (
    <View style={s.container}>
      {isRunning && <Text>{formatSecondsToClock(countdown)}</Text>}
      {!isRunning && <Button onPress={start}>Start</Button>}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
