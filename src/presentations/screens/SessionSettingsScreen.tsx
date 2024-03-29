import React, {FC, useState} from 'react';

import {View, Text} from 'react-native';

import WheelPicker from 'react-native-wheely';

const makeTimeElements = (length: number) =>
  Array.from({length}, (_, i) => i.toString().padStart(2, '0'));

const allMinutes = makeTimeElements(60);
const allHours = makeTimeElements(24);

export const SessionSettingsScreen: FC = () => {
  const [hour, setHour] = useState(() => allHours[0]);
  const [minute, setMinute] = useState(() => allMinutes[0]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <WheelPicker
        selectedIndex={allMinutes.indexOf(minute)}
        options={allMinutes}
        onChange={index => setMinute(allMinutes[index])}
      />
      <Text>:</Text>
      <WheelPicker
        selectedIndex={allHours.indexOf(hour)}
        options={allHours}
        onChange={index => setHour(allHours[index])}
      />
    </View>
  );
};
