import {ICONS} from '../../assets/Icons';

export interface miniIcon {
  id?: string;
  text1?: string;
  src?: any;
}

export const ProfileCircle: miniIcon[] = [
  {
    id: '1',
    text1: 'Not interested',
    src: ICONS.notInterested,
  },
  {
    id: '2',
    text1: 'Favourite',
    src: ICONS.favourite,
  },
  {
    id: '3',
    text1: 'Connect Now',
    src: ICONS.connectNow,
  },
];
