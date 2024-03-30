import React, {FC, useState} from 'react';

import {View, Text, Modal} from 'react-native';
import {TimePicker} from '../components/TimePicker';
import {Button} from '../components/Button';
import {useMemoizedClock, useSessionStore} from '../store/session-store';

export const SessionSettingsScreen: FC = () => {
  const time = useMemoizedClock();
  const changeSecondsFromTime = useSessionStore(
    state => state.changeSecondsFromTime,
  );

  const [isEditTimeVisible, setIsEditTimeVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{time}</Text>
      <Button onPress={() => setIsEditTimeVisible(true)}>Edit Time</Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditTimeVisible}
        onRequestClose={() => {
          setIsEditTimeVisible(false);
        }}>
        <TimePicker
          initialTime={time}
          onConfirm={confirmTime => {
            changeSecondsFromTime(confirmTime);
            setIsEditTimeVisible(false);
          }}
        />
      </Modal>
    </View>
  );
};
