import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';
import {formatSecondsToClock} from '../utils/time/time';

export const SessionScreen: FC = () => {
  const countdown = useCountdown(10);
  return (
    <View style={s.container}>
      <Text>{formatSecondsToClock(countdown)}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
