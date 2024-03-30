import React, {FC, useState} from 'react';

import {View} from 'react-native';

import WheelPicker from 'react-native-wheely';
import {Button} from './Button';
import {ModalContent, ModalFooter} from './AppModal';

const allNumbers = Array.from({length: 10}, (_, i) => String(i + 1));

type Props = {
  onConfirm: (newNumber: number) => void;
  initialNumber: number;
};

export const NumberPicker: FC<Props> = ({onConfirm, initialNumber}) => {
  const [currentNumber, setCurrentNumber] = useState(initialNumber);

  return (
    <ModalContent>
      <WheelPicker
        selectedIndex={currentNumber - 1}
        options={allNumbers}
        onChange={index => setCurrentNumber(index + 1)}
      />
      <ModalFooter>
        <Button onPress={() => onConfirm(currentNumber)}>Confirm</Button>
      </ModalFooter>
    </ModalContent>
  );
};
