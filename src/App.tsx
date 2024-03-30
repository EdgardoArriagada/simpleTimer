import {FC} from 'react';
import {View} from 'react-native';
import {TopTabsNavigator} from './presentations/routes/TopTabsNavigator';
import {NavigationContainer} from '@react-navigation/native';

export const App: FC = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <TopTabsNavigator />
      </NavigationContainer>
    </View>
  );
};
