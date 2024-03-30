import React, {FC, useState} from 'react';

import {View, Text, Modal} from 'react-native';
import {TimePicker} from '../components/TimePicker';
import {Button} from '../components/Button';
import {useSessionStore} from '../store/session-store';

export const SessionSettingsScreen: FC = () => {
  const time = useSessionStore(state => state.time);
  const changeTime = useSessionStore(state => state.changeTime);

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
            changeTime(confirmTime);
            setIsEditTimeVisible(false);
          }}
        />
      </Modal>
    </View>
  );
};
