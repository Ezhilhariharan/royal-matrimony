import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Text from '../../components/GlobalText';
import colors from '../../configurations/config/color.config';
import {ProfileCircle} from '../../utilis/staticData/Discover';
import {IMAGES} from '../../assets/Images';
import ProfileCard from '../../components/app/DiscoverProfileCard';
import {ICONS} from '../../assets/Icons';

interface profileDetails {
  profileDetails?: any;
}

const ProfileDetailsCard = ({}: profileDetails) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <Image source={IMAGES.samplePicture} style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <View style={styles.profileStatus}>
            <Image source={ICONS.greenVerify} style={styles.iconVerified} />
            <Text style={styles.smallText}>Verified</Text>
            <Image source={ICONS.premiumStar} style={styles.iconStar} />
            <Text style={styles.smallText}>Premium</Text>
          </View>
          <Text style={styles.profileName}>Jothika</Text>
          <Text style={styles.detailsText} numberOfLines={1}>
            28 yrs, 5’8”, Naidu,
          </Text>
          <Text style={styles.detailsText} numberOfLines={1}>
            BE.Chemical Engineering, Software Professional,
          </Text>
          <Text style={styles.detailsText} numberOfLines={1}>
            2 $ 7-8 Lakhs,
          </Text>
          <Text style={styles.detailsText} numberOfLines={1}>
            Chennai, India.
          </Text>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        {ProfileCircle?.map((item: any) => (
          <ProfileCard text1={item?.text1} src={item?.src} key={item?.id} />
        ))}
      </View>
      <View style={styles.horizontalLine} />
    </View>
  );
};

export default ProfileDetailsCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cardContainer: {
    padding: 15,
  },
  circleIcon: {
    width: 30,
    height: 30,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.CHAT_INACTIVE_TEXT,
  },
  profileDetails: {
    width: '60%',
    padding: 7,
    paddingLeft: 12,
  },
  profileImage: {
    width: 130,
    height: 165,
    borderRadius: 10,
  },
  iconVerified: {
    width: 15,
    height: 15,
  },
  iconStar: {
    width: 10,
    height: 10,
    marginRight: 3,
  },
  smallText: {
    fontSize: 9,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.CHAT_INACTIVE_TEXT,
    marginRight: 8,
  },
  profileStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.P_TEXT,
    paddingBottom: 6,
    paddingTop: 10,
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.CHAT_INACTIVE_TEXT,
    paddingVertical: 3.5,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#DEDEDE',
  },
});
