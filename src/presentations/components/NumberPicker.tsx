import React, {FC, useState} from 'react';

import {View} from 'react-native';

import WheelPicker from 'react-native-wheely';
import {Button} from './Button';

const allNumbers = Array.from({length: 10}, (_, i) => String(i + 1));

type Props = {
  onConfirm: (newNumber: number) => void;
  initialNumber: number;
};

export const NumberPicker: FC<Props> = ({onConfirm, initialNumber}) => {
  const [currentNumber, setCurrentNumber] = useState(initialNumber);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <WheelPicker
        selectedIndex={currentNumber - 1}
        options={allNumbers}
        onChange={index => setCurrentNumber(index + 1)}
      />
      <Button onPress={() => onConfirm(currentNumber)}>Confirm</Button>
    </View>
  );
};
