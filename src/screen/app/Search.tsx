import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Text from '../../components/GlobalText';
import colors from '../../configurations/config/color.config';
import LinearGradient from 'react-native-linear-gradient';
import {ICONS} from '../../assets/Icons';
import Box from '../../components/app/FilterBox';
import {searchFilter} from '../../utilis/staticData/Search';

const Search = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EE2150', '#B4173C']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.heading}>
        <StatusBar
          backgroundColor="transparent"
          barStyle={'light-content'}
          translucent={true}
        />
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchFilter}>
          <TextInput
            style={styles.search}
            placeholder="Search by ID"
            placeholderTextColor="#CBCBCB"
            onChangeText={() => console.log()}
            // value={value}
            // keyboardType={keyboardType}
          />
          <TouchableOpacity onPress={() => console.log()}>
            <Image source={ICONS.searchFilter} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.design} />
      </LinearGradient>
      <View style={styles.bodyContainer}>
        <Text style={styles.sectionHeader}>advanced search </Text>
        <View style={styles.advancedSearch}>
          {searchFilter?.slice(0, 2).map((item: any) => (
            <Box
              startColor={item?.startColor}
              endColor={item?.endColor}
              src={item?.src}
              title={item?.title}
            />
          ))}
        </View>
        <View style={styles.advancedSearch}>
          {searchFilter?.slice(2, 4).map((item: any) => (
            <Box
              startColor={item?.startColor}
              endColor={item?.endColor}
              src={item?.src}
              title={item?.title}
              key={item?.id}
            />
          ))}
        </View>
        <Text style={[styles.sectionHeader, {marginTop: 15}]}>
          Search by preferences
        </Text>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  heading: {
    flex: 0.27,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.WHITE_TEXT,
  },
  search: {
    width: '80%',
    height: 50,
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  filterIcon: {
    width: 35,
    height: 35,
    marginRight: 2,
  },
  design: {
    width: '100%',
    height: 30,
    backgroundColor: colors.WHITE_TEXT,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  bodyContainer: {
    paddingHorizontal: 20,
    flex: 0.7,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.P_TEXT,
    textTransform: 'uppercase',
    marginBottom: 25,
  },
  advancedSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
});
