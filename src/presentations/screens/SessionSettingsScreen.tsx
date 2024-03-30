import React, {FC, useState} from 'react';

import {View, Text, Modal} from 'react-native';
import {TimePicker} from '../components/TimePicker';
import {Button} from '../components/Button';
import {useMemoizedClock, useSessionStore} from '../store/session-store';

enum Modals {
  None,
  EditTime,
  EditRepeats,
}

export const SessionSettingsScreen: FC = () => {
  const time = useMemoizedClock();
  const repeats = useSessionStore(state => state.repeats);
  const changeSecondsFromTime = useSessionStore(
    state => state.changeSecondsFromTime,
  );

  const [visibleModal, setVisibleModal] = useState(Modals.None);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{repeats}</Text>
      <Button onPress={() => setVisibleModal(Modals.EditRepeats)}>
        Edit Repeats
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal === Modals.EditRepeats}
        onRequestClose={() => {
          setVisibleModal(Modals.None);
        }}>
        <TimePicker
          initialTime={time}
          onConfirm={confirmTime => {
            changeSecondsFromTime(confirmTime);
            setVisibleModal(Modals.None);
          }}
        />
      </Modal>

      <Text>{time}</Text>
      <Button onPress={() => setVisibleModal(Modals.EditTime)}>
        Edit Time
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal === Modals.EditTime}
        onRequestClose={() => {
          setVisibleModal(Modals.None);
        }}>
        <TimePicker
          initialTime={time}
          onConfirm={confirmTime => {
            changeSecondsFromTime(confirmTime);
            setVisibleModal(Modals.None);
          }}
        />
      </Modal>
    </View>
  );
};
