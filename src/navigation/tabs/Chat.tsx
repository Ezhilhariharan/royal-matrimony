import ChatScreen from '../../screen/app/chat/Chat';
import MessageScreen from '../../screen/app/chat/Message';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type StackParamList = {
  messageScreens: undefined;
  chatScreens: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

export const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="messageScreens"
        component={MessageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="chatScreens"
        component={ChatScreen}
        options={{headerShown: false}}
        // options={{tabBarStyle: {display: 'none'}}}
        //     screenOptions={{
        // tabBarStyle: {
        //   display: isTabVisible ? 'flex' : 'none'
        // }
      />
    </Stack.Navigator>
  );
};
