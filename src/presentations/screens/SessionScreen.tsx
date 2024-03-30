import {FC, useMemo, useState} from 'react';
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

export const SessionScreen: FC = () => {
  const [repeatsLog, setRepeatsLog] = useState<string[]>([]);

  const seconds = useSessionStore(state => state.seconds);
  const time = useMemoizedClock();

  const [countdown, isRunning, start] = useCountdown(startSeconds => {
    setRepeatsLog([...repeatsLog, formatSecondsToClock(startSeconds)]);
  });

  return (
    <View style={s.container}>
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
