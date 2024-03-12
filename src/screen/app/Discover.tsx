import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import colors from '../../configurations/config/color.config';
import Header from '../../components/app/AppHeader';
import ProfileDetailsCard from '../../components/app/ProfileDetailsCard';

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

const Discover = () => {
  return (
    <View style={styles.container}>
      <Header ShowLeftIcon={false} ShowRightIcon={false} title="Discover" />
      <View style={styles.body}>
        <FlatList
          data={profile}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ProfileDetailsCard />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    paddingVertical: 20,
  },
  body: {
    flex: 1,
  },
});
