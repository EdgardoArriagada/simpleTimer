import React, {FC, useState} from 'react';

import {View, Text} from 'react-native';

import WheelPicker from 'react-native-wheely';
import {Button} from './Button';
import {ModalContent, ModalFooter} from './AppModal';

const makeTimeElements = (length: number) =>
  Array.from({length}, (_, i) => i.toString().padStart(2, '0'));

const allMinutes = makeTimeElements(60);
const allSeconds = makeTimeElements(60);

type Props = {
  onConfirm: (time: string) => void;
  conCancel: () => void;
  initialTime: string;
};

export const TimePicker: FC<Props> = ({onConfirm, conCancel, initialTime}) => {
  const [minutes, setMinutes] = useState(() => initialTime.split(':')[0]);
  const [seconds, setSeconds] = useState(() => initialTime.split(':')[1]);

  return (
    <ModalContent>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <WheelPicker
          selectedIndex={allMinutes.indexOf(minutes)}
          options={allMinutes}
          onChange={index => setMinutes(allMinutes[index])}
        />
        <Text>:</Text>
        <WheelPicker
          selectedIndex={allSeconds.indexOf(seconds)}
          options={allSeconds}
          onChange={index => setSeconds(allSeconds[index])}
        />
      </View>
      <ModalFooter>
        <Button onPress={() => onConfirm(`${minutes}:${seconds}`)}>
          Confirm
        </Button>

        <Button secondary onPress={conCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
