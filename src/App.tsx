import {FC} from 'react';
import {View} from 'react-native';
import {gs} from './config/theme';
import {SessionScreen} from './presentations/screens/SessionScreen';

export const App: FC = () => {
  return (
    <View style={gs.container}>
      <SessionScreen />
    </View>
  );
};
