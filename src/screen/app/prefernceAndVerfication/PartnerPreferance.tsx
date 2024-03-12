import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/AuthHeader';
import {IMAGES} from '../../../assets/Images';
import TextInputCustom from '../../../components/TextInputCustom';
import {ICONS} from '../../../assets/Icons';
import ButtonCustom from '../../../components/Button';
import Text from '../../../components/GlobalText';
import SlideModal from '../../../components/SlideModal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../auth/Auth';
import colors from '../../../configurations/config/color.config';
import {
  partnerPrefernceValueType,
  partnerPrefernceFormValue,
} from '../../../utilis/types/PrefernceVerification';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import AppApi from '../../../configurations/Api/AppApi';
import {
  smokingAndDrinkingHabits,
  dietHabits,
  physicalStatus,
} from '../../../utilis/feildStaticData/PrefernceVerification';
import {
  language,
  maritalStatus,
  religion,
  caste,
  subCaste,
  doshamYes,
  employedIn,
  occupation,
  education,
  star,
} from '../../../utilis/feildStaticData/Registeration';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

const PartnerPreferance = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const countryList = useSelector((state: any) => state?.auth?.country);
  const currentUser = useSelector((state: any) => state?.auth?.currentUser);
  const dispatch = useDispatch();

  const [form, setForm] = useState<partnerPrefernceValueType>({
    ...partnerPrefernceFormValue,
  });
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [list, setList] = useState<any[]>();
  const [zodiacDetails, setzodiacDetails] = useState([]);
  const [starDetails, setStarDetails] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedData, setselectedData] = useState<any[]>([]);

  const RegisterFunc = () => {
    const body = {
      profileStatus: 2,
      partnerPreferences: {
        basicInformation: {
          age: {
            from: form.ageFrom,
            to: form.ageTo,
          },
          height: {
            from: form.heightFrom,
            to: form.heightTo,
          },
          martialStatus: form.maritalStatus,
          motherTongue: form.motherTongue,
          physicalStatus: form.physicalStatus,
          dietHabit: form.dietHabits,
          smokingHabit: form.smokingHabits,
          drinkingHabit: form.drinkingHabits,
        },
        religiousPreferences: {
          religion: form.religion,
          caste: form.caste,
          subCaste: form.subCaste,
          star: form.Star,
          dosham: form.dosham,
        },
        professionalPreferences: {
          education: form.Education,
          employedIn: form.employedIn,
          occupation: form.Desingnation,
        },
        locationPreferences: {
          country: form.location,
          city: form.city,
          state: form.state,
        },
        aboutYourPartner: form.aboutMyself,
      },
    };
    AppApi.onBoardRegister({body})
      .then(res => {
        console.log('res', res);
        AppApi.getCurrentUser()
          .then(res => {
            if (res?.status === 200) {
              dispatch(authAction.setCurrentUser(res?.data?.response?.data));
              navigation.navigate('IdVerification');
              setForm({...partnerPrefernceFormValue});
            }
          })
          .catch(error => {
            console.log('getCurrentUser', error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
    // }
  };

  useEffect(() => {
    AppApi.zodiacDetails()
      .then(res => {
        if (res?.status === 200) setzodiacDetails(res?.data?.response?.data);
      })
      .catch(error => {
        console.log('zodiacDetails-error', error);
      });
  }, []);

  const getStar = (name: string) => {
    const data: any = zodiacDetails;
    const filteredData = data.filter((item: any) => name === item?.name);
    setStarDetails(filteredData[0]?.startDetails);
  };

  const getState = (country_uuid: any) => {
    if (country_uuid) {
      const url = `country/${country_uuid}/states?limit=40&page=1`;
      AppApi.states({url})
        .then(res => {
          if (res?.status === 200) setStates(res?.data?.response?.data);
        })
        .catch(error => console.log('states-error', error));
    } else {
      console.log('undefined');
    }
  };
  const getCities = (state_uuid: any) => {
    if (state_uuid) {
      const url = `states/${state_uuid}/cities?page=1&limit=200`;
      AppApi.cities({url})
        .then(res => {
          if (res?.status === 200) setCities(res?.data?.response?.data);
        })
        .catch(({error}) => console.log('cities-error', error));
    } else {
      console.log('undefined');
    }
  };

  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Mother Tongue':
        settingModal('motherTongue', language);
        break;
      case 'Marital status':
        settingModal('maritalStatus', maritalStatus), setChecked(true);
        break;
      case 'Physical Status':
        settingModal('physicalStatus', physicalStatus), setChecked(true);
        break;
      case 'Smoking Habits':
        settingModal('smokingHabits', smokingAndDrinkingHabits),
          setChecked(true);
        break;
      case 'Drinking Habits':
        settingModal('drinkingHabits', smokingAndDrinkingHabits),
          setChecked(true);
        break;
      case 'Diet Habits':
        settingModal('dietHabits', dietHabits), setChecked(true);
        break;
      case 'Religion':
        settingModal('religion', religion), setChecked(true);
        break;
      case 'Caste':
        settingModal('caste', caste), setChecked(true);
        break;
      case 'Sub Caste':
        settingModal('subCaste', subCaste), setChecked(true);
        break;
      case 'Dosham':
        settingModal('dosham', doshamYes), setChecked(true);
        break;
      case 'Star':
        settingModal('Star', star), setChecked(true);
        break;
      case 'Location':
        settingModal('location', countryList), setChecked(false);
        break;
      case 'State':
        settingModal('state', states), setChecked(false);
        break;
      case 'City':
        settingModal('city', cities), setChecked(false);
        break;
      case 'Education':
        settingModal('Education', education), setChecked(true);
        break;
      case 'Employed In':
        settingModal('employedIn', employedIn), setChecked(true);
        break;
      case 'Desingnation':
        settingModal('Desingnation', occupation), setChecked(true);
      default:
        null;
    }
  };

  const settingModal = (feilName: string, data: any) => {
    setModalVisible(true);
    setFeildValue(feilName);
    if (
      feilName === 'location' ||
      feilName === 'state' ||
      feilName === 'city'
    ) {
      setList([...data]);
    } else {
      let value: any = [{id: 0, title: 'Any', isActive: false}];
      data?.forEach((item: any) => value.push({...item, isActive: false}));
      setList([...value]);
    }
  };

  useEffect(() => {
    if (!modalVisible && checked) selectedPopupData(selectedData?.join());
  }, [modalVisible]);

  const addArrayData = (data: any) => {
    if (data?.title === 'Any') {
      setList(prevState =>
        prevState?.map((item: any) => {
          if (!data?.isActive) return {...item, isActive: true};
          else return {...item, isActive: false};
        }),
      );
    } else {
      setList(prevState =>
        prevState?.map((item: any) => {
          if (data?.title === item?.title && data?.isActive)
            return {...item, isActive: false};
          else if (data?.title === item?.title && !data?.isActive) {
            return {...item, isActive: true};
          } else {
            return {...item};
          }
        }),
      );
    }
  };

  useEffect(() => {
    const arrList = list;
    const verifiedList = arrList?.filter(item => item?.isActive === true);

    const List: any = [];
    verifiedList?.map((data: any) => List.push(data?.title));

    const getAny = List?.find((item: any) => item === 'Any');
    if (getAny === 'Any') {
      const allList: any = [];
      list?.map(
        (data: any) => data?.title != 'Any' && allList.push(data?.title),
      );
      setselectedData(allList);
    } else {
      setselectedData(List);
    }
  }, [list]);

  const selectedPopupData = (value: any) => {
    console.log('selectedPopupData', value);

    switch (feildValue) {
      case 'motherTongue':
        setForm({...form, motherTongue: value});
        break;
      case 'maritalStatus':
        setForm({...form, maritalStatus: value});
        break;
      case 'physicalStatus':
        setForm({...form, physicalStatus: value});
        break;
      case 'smokingHabits':
        setForm({...form, smokingHabits: value});
        break;
      case 'drinkingHabits':
        setForm({...form, drinkingHabits: value});
        break;
      case 'dietHabits':
        setForm({...form, dietHabits: value});
        break;
      case 'religion':
        setForm({...form, religion: value});
        break;
      case 'caste':
        setForm({...form, caste: value});
        break;
      case 'subCaste':
        setForm({...form, subCaste: value});
        break;
      case 'dosham':
        setForm({...form, dosham: value});
        break;
      case 'Star':
        setForm({...form, Star: value});
        break;
      case 'location':
        setForm({...form, location: value?.name}), getState(value?.uuid);
        break;
      case 'state':
        setForm({...form, state: value?.name}), getCities(value?.uuid);
        break;
      case 'city':
        setForm({...form, city: value?.name, cityError: ''});
        break;
      case 'Education':
        setForm({...form, Education: value});
        break;
      case 'employedIn':
        setForm({...form, employedIn: value});
        break;
      case 'Desingnation':
        setForm({...form, Desingnation: value});
      default:
        null;
    }
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Header
        imgSrc={IMAGES.partnerPrefernce}
        navigationText="PartnerPreferance"
      />
      <ScrollView style={styles.form}>
        <Text style={styles.contentHeading}>Partner Preferences</Text>
        <Text style={styles.heading}>Basic Preferences</Text>
        <Text style={styles.sectionHeading}>Age</Text>
        <View style={styles.row}>
          <View style={{width: '45%'}}>
            <TextInputCustom
              value={form.ageFrom}
              error={form.ageFromError}
              activeIcon={toogleFunc}
              onChangeText={ageFrom =>
                setForm({...form, ageFrom, ageFromError: ''})
              }
              placeholder="18"
              label="From"
            />
          </View>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="25"
              value={form.ageTo}
              error={form.ageToError}
              activeIcon={toogleFunc}
              onChangeText={ageTo => setForm({...form, ageTo, ageToError: ''})}
              label="To"
            />
          </View>
        </View>
        <Text style={styles.sectionHeading}>Height</Text>
        <View style={styles.row}>
          <View style={{width: '45%'}}>
            <TextInputCustom
              value={form.heightFrom}
              error={form.heightFromError}
              activeIcon={toogleFunc}
              onChangeText={heightFrom =>
                setForm({...form, heightFrom, heightFromError: ''})
              }
              placeholder="4.5"
              label="From"
            />
          </View>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="5"
              value={form.heightTo}
              error={form.heightToError}
              activeIcon={toogleFunc}
              onChangeText={heightTo =>
                setForm({...form, heightTo, heightToError: ''})
              }
              label="To"
            />
          </View>
        </View>
        <TextInputCustom
          placeholder="Never Married"
          value={form.maritalStatus}
          error={form.maritalStatusError}
          activeIcon={toogleFunc}
          label="Marital status"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Tamil"
          label="Mother Tongue"
          value={form.motherTongue}
          error={form.motherTongueError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Physical Status"
          value={form.physicalStatus}
          error={form.physicalStatusError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.dietHabits}
          error={form.dietHabitsError}
          activeIcon={toogleFunc}
          label="Diet Habits"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Smoking Habits"
          value={form.smokingHabits}
          error={form.smokingHabitsError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.drinkingHabits}
          error={form.drinkingHabitsError}
          activeIcon={toogleFunc}
          label="Drinking Habits"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />

        <Text style={styles.heading}>religious Preferences </Text>
        <TextInputCustom
          placeholder="Hindu"
          value={form.religion}
          error={form.religionError}
          activeIcon={toogleFunc}
          label="Religion"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select "
          value={form.caste}
          error={form.casteError}
          activeIcon={toogleFunc}
          label="Caste"
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Sub Caste"
          value={form.subCaste}
          error={form.subCasteError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Star"
          value={form.Star}
          error={form.StarError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        {currentUser?.religionDetails?.dosham !== '' && (
          <TextInputCustom
            placeholder="Select "
            value={form.dosham}
            error={form.doshamError}
            activeIcon={toogleFunc}
            label="Dosham"
            backIcon={ICONS.rightArrowInput}
            numberOfLines={1}
          />
        )}

        <Text style={styles.sectionHeading}>Professional Preferences</Text>
        <TextInputCustom
          placeholder="Select"
          label="Education"
          value={form.Education}
          error={form.EducationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Employed In"
          value={form.employedIn}
          error={form.employedInError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />
        <TextInputCustom
          placeholder="Select"
          label="Desingnation"
          value={form.Desingnation}
          error={form.DesingnationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
          numberOfLines={1}
        />

        <Text style={styles.sectionHeading}>Location Preferences</Text>
        <TextInputCustom
          placeholder="Select"
          label="Location"
          value={form.location}
          error={form.locationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <View style={styles.row}>
          <View style={{width: '45%'}}>
            <TextInputCustom
              placeholder="Enter Your State"
              value={form.state}
              error={form.stateError}
              activeIcon={toogleFunc}
              onChangeText={state => setForm({...form, state, stateError: ''})}
              label="State"
            />
          </View>
          <View style={{width: '45%'}}>
            <TextInputCustom
              value={form.city}
              error={form.cityError}
              activeIcon={toogleFunc}
              onChangeText={city => setForm({...form, city, cityError: ''})}
              placeholder="Enter Your City"
              label="City"
            />
          </View>
        </View>
        <TextInputCustom
          placeholder=""
          label="About your Partner (Expectation)"
          value={form.aboutMyself}
          error={form.aboutMyselfError}
          onChangeText={aboutMyself =>
            setForm({...form, aboutMyself, aboutMyselfError: ''})
          }
          activeIcon={toogleFunc}
          multpileline={true}
          multiline
          numberOfLines={4}
        />

        <ButtonCustom title="Continue" onPressFunc={RegisterFunc} MV={10} />

        <View style={styles.buttom} />
      </ScrollView>
      <SlideModal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        feildName={feildValue}
        search={true}
        checkbox={checked}
        list={list}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedArrayData={addArrayData}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default PartnerPreferance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.P_TEXT,
    lineHeight: 24,
    marginVertical: 10,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 0.6,
  },
  registerContent: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.P_TEXT,
    paddingHorizontal: 20,
    height: 60,
  },
  buttom: {
    height: 80,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.P_TEXT,
    marginBottom: 5,
  },
  contentHeading: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.SECONDARY_COLOR,
  },
});
