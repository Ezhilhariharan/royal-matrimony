import {ICONS} from '../../assets/Icons';

export interface miniIcon {
  startColor?: string;
  endColor?: string;
  src?: any;
  title?: string;
  id?: string;
}

export const searchFilter: miniIcon[] = [
  {
    id: '1',
    startColor: '#27AE60',
    endColor: '#27AE60',
    src: ICONS.searchBag,
    title: 'Filter by profession',
  },
  {
    id: '2',
    startColor: '#EE2150',
    endColor: '#B3173C',
    src: ICONS.searchLocation,
    title: 'Filter by location',
  },
  {
    id: '3',
    startColor: '#F2994A',
    endColor: '#F2994A',
    src: ICONS.searchStar,
    title: 'Filter by star',
  },
  {
    id: '4',
    startColor: '#2F80ED',
    endColor: '#2F80ED',
    src: ICONS.searchReligion,
    title: 'Filter by religion',
  },
];
