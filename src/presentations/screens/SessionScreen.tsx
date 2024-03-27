import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const SessionScreen: FC = () => {
  return (
    <View style={s.container}>
      <Text>SessionScreen</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
