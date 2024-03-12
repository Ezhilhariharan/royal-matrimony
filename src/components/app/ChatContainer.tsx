import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from '../../components/GlobalText';
import colors from '../../configurations/config/color.config';
import Avatar from '../../components/Avatar';

interface chat {
  profilePicture?: string;
  OnPress?: (value: any) => void;
  name?: string;
  message?: string;
  time?: string | number;
  count?: string;
}

const ChatContainer = ({
  profilePicture,
  OnPress,
  name,
  message,
  time,
  count,
}: chat) => {
  const profileNavigate = () => {};
  return (
    <TouchableOpacity style={styles.chatContainer} onPress={OnPress}>
      <Avatar
        WIDTH={70}
        HEIGHT={70}
        src={profilePicture}
        PressFunc={profileNavigate}
      />
      <View style={styles.middleContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.messageActive} numberOfLines={1}>
          {message}
        </Text>
        {/* <Text style={styles.messageInActive} numberOfLines={1}>
              Hi, morning too Virat!    
            </Text> */}
      </View>
      <View style={styles.lastContainer}>
        <View style={styles.unReadCount}>
          <Text style={styles.Count}>{count}</Text>
        </View>
        <Text style={styles.messageActive}>{time}</Text>
        {/* <Text style={styles.messageInActive}>Yesterday</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default ChatContainer;

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  middleContainer: {
    width: '60%',
    paddingHorizontal: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.P_TEXT,
  },
  messageInActive: {
    fontSize: 15,
    fontWeight: '100',
    color: colors.CHAT_INACTIVE_TEXT,
    marginTop: 7,
  },
  lastContainer: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  messageActive: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.P_TEXT,
    marginTop: 7,
  },
  unReadCount: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: colors.SECONDARY_COLOR,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Count: {
    fontSize: 10,
    fontWeight: '400',
    color: colors.WHITE_TEXT,
  },
});
