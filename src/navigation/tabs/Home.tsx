import HomeScreen from '../../screen/app/home/Home';
import ProfileScreen from '../../screen/app/home/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type StackParamList = {
  HomeScreens: undefined;
  Profile: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreens"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
