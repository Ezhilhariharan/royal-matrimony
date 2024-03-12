import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import Text from '../../../components/GlobalText';
import colors from '../../../configurations/config/color.config';
import Header from '../../../components/app/AppHeader';
import ChatCard from '../../../components/app/ChatContainer';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../navigation/tabs/Chat';
import Avatar from '../../../components/Avatar';
import {DOMAIN_CLOUD_CDN} from '../../../configurations/config/app.config';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

const profile: any = [
  {
    id: '1',
    img: 'cool',
  },
  {
    id: '2',
    img: 'cool',
  },
  {
    id: '3',
    img: 'cool',
  },
  {
    id: '4',
    img: 'cool',
  },
  {
    id: '5',
    img: 'cool',
  },
];

const Message = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const profileImage: any = `${DOMAIN_CLOUD_CDN}${currentUser?.uuid}/profilePhoto/${currentUser?.avatar}`;

  const profileNavigate = () => {};
  const navFunc = () => {};
  const goChat = () => navigation.navigate('chatScreens');
  return (
    <View style={styles.container}>
      <Header title="Messages" navFunc={navFunc} ShowLeftIcon={false} />

      <View style={styles.recentMatches}>
        <Text style={styles.sideHeading}>Recent Matches</Text>
        <FlatList
          data={profile}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.matchesContainer}>
              <View style={styles.borderAvatar}>
                <Avatar
                  WIDTH={75}
                  HEIGHT={75}
                  src={profileImage}
                  PressFunc={profileNavigate}
                />
              </View>
              <Text style={styles.matchesName} numberOfLines={1}>
                Thalapathy
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.sideHeading}>Messages</Text>
        <FlatList
          data={profile}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ChatCard
              profilePicture={profileImage}
              OnPress={goChat}
              name="Brindha"
              message="Hi, morning too Virat!"
              time="Yesterday"
              count="1"
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    paddingVertical: 20,
  },
  sideHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.P_TEXT,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  borderAvatar: {
    width: 83,
    height: 83,
    borderRadius: 100,
    marginTop: 7,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.SECONDARY_COLOR,
  },
  recentMatches: {
    marginTop: 10,
    flex: 0.24,
  },
  messageContainer: {
    flex: 0.7,
  },
  matchesName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.P_TEXT,
    textAlign: 'center',
    width: 80,
    marginTop: 5,
  },
  matchesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
