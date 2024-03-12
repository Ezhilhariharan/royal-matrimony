import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/RegistrationHeader';
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
  valueType,
  formValue,
} from '../../../utilis/types/PrefernceVerification';
import {WIDTH, HEIGHT} from '../../../configurations/config/app.config';
import AppApi from '../../../configurations/Api/AppApi';
import {
  bodyType,
  smokingAndDrinkingHabits,
  dietHabits,
  fatherAndMotherOccupation,
  amAndPm,
} from '../../../utilis/feildStaticData/PrefernceVerification';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {authAction} from '../../../redux/actions';

const PersonalDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const countryList = useSelector((state: any) => state?.auth?.country);
  const dispatch = useDispatch();

  const [form, setForm] = useState<valueType>({...formValue});
  const [feildValue, setFeildValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [zodiacDetails, setzodiacDetails] = useState([]);
  const [starDetails, setStarDetails] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState<any[]>([]);
  const [list, setList] = useState<any>('');

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
      console.log('country_uuid', country_uuid);
      AppApi.states({url})
        .then(res => {
          console.log('country_uuid', res);
          if (res?.status === 200) setStates(res?.data?.response?.data);
        })
        .catch(({error}) => console.log('states-error', error));
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

  const RegisterFunc = () => {
    const body = {
      profileStatus: 1,
      careerDetails: {
        educationInstitution: form.educationInstitution,
        organization: form.Organization,
      },
      basicDetails: {
        weight: form.Weight,
        bodyType: form.bodyType,
      },
      lifeStyleDetails: {
        smokingHabit: form.smokingHabits,
        drinkingHabit: form.drinkingHabits,
        dietHabit: form.dietHabits,
      },
      religiousDetails: {
        moonSign: form.raasiAndMoonSign,
        star: form.Star,
      },
      horoscopeDetails: {
        placeOfBirth: {
          country: form.country,
          city: form.city,
          state: form.state,
        },
        timeOfBirth: {
          hours: form.Hour,
          minutes: form.Minutes,
          hourPeriod: form.AMAndPM,
        },
      },
      familyDetails: {
        fatherOccupation: form.fatherOccupation,
        motherOccupation: form.motherOccupation,
      },
    };

    AppApi.onBoardRegister({body})
      .then(res => {
        AppApi.getCurrentUser()
          .then(res => {
            if (res?.status === 200) {
              dispatch(authAction.setCurrentUser(res?.data?.response?.data));
              navigation.navigate('PartnerPreferance');
              setForm({...formValue});
            }
          })
          .catch(error => {
            console.log('getCurrentUser', error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const toogleFunc = (text: string) => {
    switch (text) {
      case 'Body Type':
        settingModal('bodyType', bodyType);
        break;
      case 'Smoking Habits':
        settingModal('smokingHabits', smokingAndDrinkingHabits);
        break;
      case 'Drinking Habits':
        settingModal('drinkingHabits', smokingAndDrinkingHabits);
        break;
      case 'Diet Habits':
        settingModal('dietHabits', dietHabits);
        break;
      case 'Father Occupation':
        settingModal('fatherOccupation', fatherAndMotherOccupation);
        break;
      case 'Mother Occupation':
        settingModal('motherOccupation', fatherAndMotherOccupation);
        break;
      case 'Raasi/Moon Sign':
        settingModal('raasiAndMoonSign', zodiacDetails);
        break;
      case 'Star':
        settingModal('Star', starDetails);
        break;
      case 'Country':
        settingModal('country', countryList);
        break;
      case 'State':
        settingModal('state', states);
        break;
      case 'City':
        settingModal('city', cities);
        break;
      case 'AM/PM':
        settingModal('AMAndPM', amAndPm);
        break;
      default:
        null;
    }
  };

  const settingModal = (feilName: string, data: any) => {
    setModalVisible(true);
    setFeildValue(feilName);
    setList([...data]);
  };

  const selectedPopupData = (value: any) => {
    switch (feildValue) {
      case 'bodyType':
        setForm({...form, bodyType: value?.title, bodyTypeError: ''});
        break;
      case 'smokingHabits':
        setForm({...form, smokingHabits: value?.title, smokingHabitsError: ''});
        break;
      case 'drinkingHabits':
        setForm({
          ...form,
          drinkingHabits: value?.title,
          drinkingHabitsError: '',
        });
        break;
      case 'dietHabits':
        setForm({...form, dietHabits: value?.title, dietHabitsError: ''});
        break;
      case 'fatherOccupation':
        setForm({
          ...form,
          fatherOccupation: value?.title,
          fatherOccupationError: '',
        });
        break;
      case 'motherOccupation':
        setForm({
          ...form,
          motherOccupation: value?.title,
          motherOccupationError: '',
        });
        break;
      case 'raasiAndMoonSign':
        setForm({
          ...form,
          raasiAndMoonSign: value?.name,
          raasiAndMoonSignError: '',
        }),
          getStar(value?.name);
        break;
      case 'Star':
        setForm({...form, Star: value?.name, StarError: ''});
        break;
      case 'country':
        setForm({...form, country: value?.name, countryError: ''}),
          getState(value?.uuid);
        break;
      case 'state':
        setForm({...form, state: value?.name, stateError: ''}),
          getCities(value?.uuid);
        break;
      case 'city':
        setForm({...form, city: value?.name, cityError: ''});
        break;
      case 'AMAndPM':
        setForm({...form, AMAndPM: value?.title, AMAndPMError: ''});
        break;
      default:
        null;
    }
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Header
        title="Personal Details"
        content="Give us more information that stand out your profile."
        imgSrc={ICONS.verified}
        showContent={true}
        navigation={true}
      />
      <ScrollView style={styles.form}>
        <Text style={styles.heading}>Career Information</Text>
        <TextInputCustom
          placeholder="Enter College/Institution"
          label="Education Institution"
          value={form.educationInstitution}
          error={form.educationInstitutionError}
          activeIcon={toogleFunc}
          onChangeText={educationInstitution =>
            setForm({
              ...form,
              educationInstitution,
              educationInstitutionError: '',
            })
          }
        />
        <TextInputCustom
          placeholder="Enter Organization Name"
          value={form.Organization}
          error={form.OrganizationError}
          activeIcon={toogleFunc}
          onChangeText={Organization =>
            setForm({
              ...form,
              Organization,
              OrganizationError: '',
            })
          }
          label="Organization"
        />

        <Text style={styles.heading}>Basic Information</Text>
        <TextInputCustom
          placeholder=""
          value={form.Weight}
          error={form.WeightError}
          activeIcon={toogleFunc}
          onChangeText={Weight => setForm({...form, Weight, WeightError: ''})}
          label="Weight"
          keyboardType="number-pad"
          maxLength={3}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.bodyType}
          error={form.bodyTypeError}
          activeIcon={toogleFunc}
          label="Body Type"
          backIcon={ICONS.rightArrowInput}
        />

        <Text style={styles.heading}>Lifestyle Information </Text>
        <TextInputCustom
          placeholder="Select"
          label="Smoking Habits"
          value={form.smokingHabits}
          error={form.smokingHabitsError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          value={form.drinkingHabits}
          error={form.drinkingHabitsError}
          activeIcon={toogleFunc}
          label="Drinking Habits"
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Flexitarian"
          label="Diet Habits"
          value={form.dietHabits}
          error={form.dietHabitsError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />

        <Text style={styles.heading}>Religious Information </Text>
        <TextInputCustom
          placeholder="Select"
          label="Raasi/Moon Sign"
          value={form.raasiAndMoonSign}
          error={form.raasiAndMoonSignError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Select"
          label="Star"
          value={form.Star}
          error={form.StarError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />

        <Text style={styles.heading}>Horoscope Information</Text>

        <Text style={styles.sectionHeading}>Place of Birth</Text>
        <TextInputCustom
          placeholder="India"
          label="Country"
          value={form.country}
          error={form.countryError}
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

        <Text style={styles.sectionHeading}>Time of Birth</Text>
        <View style={styles.row}>
          <View style={{width: '30%'}}>
            <TextInputCustom
              value={form.Hour}
              error={form.HourError}
              activeIcon={toogleFunc}
              keyboardType="number-pad"
              onChangeText={Hour => setForm({...form, Hour, HourError: ''})}
              placeholder="12"
              label="Hour"
            />
          </View>
          <View style={{width: '30%'}}>
            <TextInputCustom
              placeholder="00"
              value={form.Minutes}
              error={form.MinutesError}
              activeIcon={toogleFunc}
              keyboardType="number-pad"
              onChangeText={Minutes =>
                setForm({...form, Minutes, MinutesError: ''})
              }
              label="Minutes"
            />
          </View>
          <View style={{width: '30%'}}>
            <TextInputCustom
              placeholder="AM"
              value={form.AMAndPM}
              error={form.AMAndPMError}
              activeIcon={toogleFunc}
              label="AM/PM"
            />
          </View>
        </View>

        <Text style={styles.heading}>Family Information</Text>
        <TextInputCustom
          placeholder="Employed"
          label="Father Occupation"
          value={form.fatherOccupation}
          error={form.fatherOccupationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
        />
        <TextInputCustom
          placeholder="Employed"
          label="Mother Occupation"
          value={form.motherOccupation}
          error={form.motherOccupationError}
          activeIcon={toogleFunc}
          backIcon={ICONS.rightArrowInput}
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
        list={list}
        search={true}
        selectedArrayData={toogleFunc}
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
        selectedPopupData={selectedPopupData}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      />
    </View>
  );
};

export default PersonalDetails;

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
});
