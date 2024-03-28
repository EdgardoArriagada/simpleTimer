import {FC} from 'react';
import {View} from 'react-native';
import {gs} from './config/theme';
import {TopTabsNavigator} from './presentations/routes/TopTabsNavigator';
import {NavigationContainer} from '@react-navigation/native';

export const App: FC = () => {
  return (
    <View style={gs.container}>
      <NavigationContainer>
        <TopTabsNavigator />
      </NavigationContainer>
    </View>
  );
};
