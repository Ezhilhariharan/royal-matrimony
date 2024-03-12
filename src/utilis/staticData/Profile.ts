import {ICONS} from '../../assets/Icons';

export interface miniIcon {
  id?: string;
  text1?: string;
  text2?: string;
  src?: any;
}

export const ProfileMini: miniIcon[] = [
  {
    id: '1',
    text1: 'ID',
    text2: 'Verified',
    src: ICONS.bluishCyanVerified,
  },
  {
    id: '2',
    text1: 'Selfie',
    text2: 'Verified',
    src: ICONS.selfieVerified,
  },
  {
    id: '3',
    text1: 'Premium',
    text2: 'Crown',
    src: ICONS.premiumCrown,
  },
];

export const ProfileCircle: miniIcon[] = [
  {
    id: '1',
    text1: 'Profile Details',
    src: ICONS.ProfileDetails,
  },
  {
    id: '2',
    text1: 'Privacy',
    src: ICONS.Privacy,
  },
  {
    id: '3',
    text1: 'Preferences',
    src: ICONS.Preferences,
  },
  {
    id: '4',
    text1: 'Invite',
    src: ICONS.Invite,
  },
  {
    id: '5',
    text1: 'Upgrade',
    src: ICONS.Upgrade,
  },
  {
    id: '6',
    text1: 'Settings',
    src: ICONS.Settings,
  },
];
