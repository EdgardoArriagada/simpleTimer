import {FC} from 'react';
import {Text, View} from 'react-native';
import {gs} from './config/theme';

export const App: FC = () => {
  return (
    <View style={gs.container}>
      <Text>App</Text>
    </View>
  );
};
