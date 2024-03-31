import React, {FC, useState} from 'react';

import {View, Text} from 'react-native';
import {TimePicker} from '../components/TimePicker';
import {Button} from '../components/Button';
import {useMemoizedClock, useSessionStore} from '../store/session-store';
import {NumberPicker} from '../components/NumberPicker';
import {AppModal} from '../components/AppModal';
import Icon from 'react-native-vector-icons/Ionicons';

enum Modals {
  None,
  EditTime,
  EditRepeats,
}

type ItemLayoutProps = {
  onButtonPress: () => void;
  text: string;
  value: string | number;
};

const ItemLayout: FC<ItemLayoutProps> = ({onButtonPress, text, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '60%',
      }}>
      <Text>{`${text}: ${value}`}</Text>
      <Button
        secondary
        onPress={onButtonPress}
        renderIcon={({style}) => (
          <Icon style={style} name="pencil-outline" size={30} color="#900" />
        )}
      />
    </View>
  );
};

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
        marginTop: 60,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <ItemLayout
        text="Repeats"
        value={repeats}
        onButtonPress={() => setVisibleModal(Modals.EditRepeats)}
      />
      <ItemLayout
        text="Time"
        value={time}
        onButtonPress={() => setVisibleModal(Modals.EditTime)}
      />

      <AppModal
        visible={visibleModal === Modals.EditRepeats}
        onRequestClose={closeModal}>
        <NumberPicker
          onCancel={closeModal}
          initialNumber={repeats}
          onConfirm={newRepeats => {
            changeRepeats(newRepeats);
            closeModal();
          }}
        />
      </AppModal>

      <AppModal
        visible={visibleModal === Modals.EditTime}
        onRequestClose={closeModal}>
        <TimePicker
          initialTime={time}
          conCancel={closeModal}
          onConfirm={confirmTime => {
            changeSecondsFromTime(confirmTime);
            closeModal();
          }}
        />
      </AppModal>
    </View>
  );
};
