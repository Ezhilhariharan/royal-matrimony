import {StyleSheet, View, TextInput, Image} from 'react-native';
import React from 'react';
import colors from '../../../configurations/config/color.config';
import Text from '../../../components/GlobalText';
import Header from '../../../components/app/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Chat';
import {ICONS} from '../../../assets/Icons';

const Chat = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navFunc = () => {};
  return (
    <View style={styles.container}>
      <Header
        title="Chat"
        navFunc={navFunc}
        ShowLeftIcon={true}
        ShowRightIcon={true}
      />
      <View style={styles.chatContainer}>
        <View style={styles.margin}>
          <View style={styles.leftChat}>
            <Text style={styles.leftChatText}>
              Hi Brindha, good morning 😄Hi Brindha, good morning 😄 Hi Brindha,
              good morning 😄 Hi Brindha, good morning 😄 Hi Brindha, good
              morning 😄 Hi Brindha, good morning 😄
            </Text>
            <Text style={styles.leftChatTime}>10:00</Text>
          </View>
          <View style={styles.leftChat}>
            <Text style={styles.leftChatText}>How are you today?</Text>
            <Text style={styles.leftChatTime}>10:00</Text>
          </View>
        </View>

        <View style={styles.margin}>
          <View style={styles.rightChat}>
            <Text style={styles.rightChatText}>
              Hi Brindha, good morning 😄
            </Text>
            <Text style={styles.rightChatTime}>10:00</Text>
          </View>
          <View style={styles.rightChat}>
            <Text style={styles.rightChatText}>Yes you're good</Text>
            <Text style={styles.rightChatTime}>10:00</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.inputMessage}>
          <Image source={ICONS.smile} style={styles.smile} />
          <TextInput style={styles.textInput} />
        </View>
        <Image source={ICONS.mic} style={styles.mic} />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    paddingVertical: 20,
  },
  chatContainer: {
    flex: 0.8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mic: {
    width: 55,
    height: 55,
    marginHorizontal: 5,
  },
  inputMessage: {
    width: '80%',
    height: 58,
    backgroundColor: colors.BG_FORM_LIGHT_GREY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  footer: {
    flex: 0.1,
    // height: 60,
    // minHeight: 60,
    backgroundColor: colors.PRIMARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smile: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  margin: {
    marginVertical: 10,
  },
  textInput: {
    width: 250,
    height: 55,
    backgroundColor: colors.BG_FORM_LIGHT_GREY,
  },
  leftChat: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    maxWidth: 300,
    height: 'auto',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderTopEndRadius: 7,
    marginVertical: 5,
    backgroundColor: colors.SECONDARY_COLOR,
  },
  rightChat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 300,
    height: 'auto',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderTopStartRadius: 7,
    marginVertical: 5,
    backgroundColor: colors.BG_LIGHT_GREY,
  },
  rightChatText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.T_TEXT,
  },
  rightChatTime: {
    marginTop: 'auto',
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '400',
    color: colors.Q_TEXT,
  },
  leftChatText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.WHITE_TEXT,
  },
  leftChatTime: {
    marginTop: 'auto',
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '400',
    color: colors.WHITE_TEXT,
  },
});
