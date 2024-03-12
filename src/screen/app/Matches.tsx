import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import React from 'react';
import Header from '../../components/app/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/tabs/Home';
import colors from '../../configurations/config/color.config';
import Text from '../../components/GlobalText';
import {IMAGES} from '../../assets/Images';
import {ICONS} from '../../assets/Icons';
// import {BlurView} from '@react-native-community/blur';

const Matches = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const navFunc = () => navigation.goBack();
  const profileNav = () => {};
  return (
    <View style={styles.container}>
      <Header
        title="Matches"
        navFunc={navFunc}
        ShowLeftIcon={true}
        ShowRightIcon={true}
        ShowProfile={true}
        profileNav={profileNav}
      />
      <View style={styles.headContainer}>
        <Text style={styles.heading}>Matches for You</Text>
      </View>
      <View style={styles.body}>
        <ImageBackground
          source={IMAGES.samplePicture}
          imageStyle={{borderRadius: 12}}
          style={styles.matchesCard}>
          <View style={styles.bottom}>
            <Text style={styles.name} numberOfLines={1}>
              Samantha, 26
            </Text>
            <Text style={styles.description} numberOfLines={1}>
              Software Engineer,Chennai
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.likeAction}>
          <Image source={ICONS.matchesStar} style={styles.middleIcon} />
        </View>
        <View style={styles.actions}>
          <Image source={ICONS.notInterested} style={styles.leftIcon} />
          <Image source={ICONS.matchesHeart} style={styles.rightIcon} />
        </View>
      </View>
    </View>
  );
};

export default Matches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.P_TEXT,
    textTransform: 'uppercase',
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.08,
  },
  body: {
    flex: 0.8,
    padding: 20,
    position: 'relative',
  },
  matchesCard: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottom: {
    padding: 20,
    width: '100%',
    height: 125,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.P_TEXT,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.P_TEXT,
  },
  actions: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 25,
    left: 0,
  },
  likeAction: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 70,
  },
  middleIcon: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
  leftIcon: {
    marginLeft: 40,
    width: 80,
    height: 80,
  },
  rightIcon: {
    width: 80,
    height: 80,
  },
});
