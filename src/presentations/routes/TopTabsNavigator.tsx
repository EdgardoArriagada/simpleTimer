import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SessionScreen} from '../screens/SessionScreen';
import {SessionSettingsScreen} from '../screens/SessionSettingsScreen';

const Tab = createMaterialTopTabNavigator();

export function TopTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Session" component={SessionScreen} />
      <Tab.Screen name="Settings" component={SessionSettingsScreen} />
    </Tab.Navigator>
  );
}
