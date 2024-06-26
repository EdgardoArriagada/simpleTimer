import React, {FC, useState} from 'react';

import {View, Text} from 'react-native';
import {TimePicker} from '../components/TimePicker';
import {Button} from '../components/Button';
import {useSessionStore} from '../store/session-store';
import {NumberPicker} from '../components/NumberPicker';
import {AppModal} from '../components/AppModal';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatSecondsToClock} from '../utils/time/time';

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
          <Icon style={style} name="pencil-outline" size={30} />
        )}
      />
    </View>
  );
};

export const SessionSettingsScreen: FC = () => {
  const repeats = useSessionStore(state => state.repeats);
  const seconds = useSessionStore(state => state.seconds);
  const time = formatSecondsToClock(seconds);
  const changeRepeats = useSessionStore(state => state.changeRepeats);
  const changeSeconds = useSessionStore(state => state.changeSeconds);

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
          onConfirm={newSeconds => {
            changeSeconds(newSeconds);
            closeModal();
          }}
        />
      </AppModal>
    </View>
  );
};
