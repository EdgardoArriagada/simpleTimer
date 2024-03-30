import React, {FC, useState} from 'react';

import {View, Text, Modal} from 'react-native';
import {TimePicker} from '../components/TimePicker';
import {Button} from '../components/Button';
import {useMemoizedClock, useSessionStore} from '../store/session-store';
import {NumberPicker} from '../components/NumberPicker';

enum Modals {
  None,
  EditTime,
  EditRepeats,
}

export const SessionSettingsScreen: FC = () => {
  const time = useMemoizedClock();
  const repeats = useSessionStore(state => state.repeats);
  const changeRepeats = useSessionStore(state => state.changeRepeats);
  const changeSecondsFromTime = useSessionStore(
    state => state.changeSecondsFromTime,
  );

  const [visibleModal, setVisibleModal] = useState(Modals.None);
  const closeModal = () => setVisibleModal(Modals.None);

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
        onRequestClose={closeModal}>
        <NumberPicker
          initialNumber={repeats}
          onConfirm={newRepeats => {
            changeRepeats(newRepeats);
            closeModal();
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
        onRequestClose={closeModal}>
        <TimePicker
          initialTime={time}
          onConfirm={confirmTime => {
            changeSecondsFromTime(confirmTime);
            closeModal();
          }}
        />
      </Modal>
    </View>
  );
};
