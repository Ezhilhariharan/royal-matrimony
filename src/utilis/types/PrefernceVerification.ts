export interface valueType {
  educationInstitution: string;
  Organization: string;
  Weight: string;
  bodyType: string;
  smokingHabits: string;
  drinkingHabits: any;
  dietHabits: any;
  raasiAndMoonSign: any;
  Star: any;
  country: any;
  city: any;
  state: any;
  Hour: any;
  Minutes: any;
  AMAndPM: any;
  fatherOccupation: any;
  motherOccupation: any;

  educationInstitutionError: any;
  OrganizationError: string;
  WeightError: string;
  bodyTypeError: string;
  smokingHabitsError: string;
  drinkingHabitsError: string;
  dietHabitsError: string;
  raasiAndMoonSignError: string;
  StarError: string;
  countryError: any;
  cityError: string;
  stateError: string;
  HourError: string;
  MinutesError: string;
  AMAndPMError: any;
  fatherOccupationError: string;
  motherOccupationError: string;
}

export const formValue = {
  educationInstitution: '',
  Organization: '',
  Weight: '',
  bodyType: '',
  smokingHabits: '',
  drinkingHabits: '',
  dietHabits: '',
  raasiAndMoonSign: '',
  Star: '',
  country: '',
  city: '',
  state: '',
  Hour: '',
  Minutes: '',
  AMAndPM: '',
  fatherOccupation: '',
  motherOccupation: '',

  educationInstitutionError: '',
  OrganizationError: '',
  WeightError: '',
  bodyTypeError: '',
  smokingHabitsError: '',
  drinkingHabitsError: '',
  dietHabitsError: '',
  raasiAndMoonSignError: '',
  StarError: '',
  countryError: '',
  cityError: '',
  stateError: '',
  HourError: '',
  MinutesError: '',
  AMAndPMError: '',
  fatherOccupationError: '',
  motherOccupationError: '',
};

export interface partnerPrefernceValueType {
  ageFrom: string;
  ageTo: string;
  heightFrom: string;
  heightTo: string;
  location: any;
  aboutMyself: string;
  city: any;
  state: any;
  smokingHabits: string;
  drinkingHabits: any;
  dietHabits: any;
  maritalStatus: string;
  physicalStatus: string;
  motherTongue: string;
  religion: string;
  caste: string;
  subCaste: string;
  dosham: any;
  Star: any;
  Education: any;
  employedIn: any;
  Desingnation: any;

  physicalStatusError: string;
  ageFromError: any;
  ageToError: string;
  heightFromError: string;
  heightToError: string;
  smokingHabitsError: string;
  drinkingHabitsError: string;
  dietHabitsError: string;
  maritalStatusError: string;
  motherTongueError: string;
  religionError: string;
  casteError: string;
  subCasteError: string;
  doshamError: string;
  StarError: string;
  EducationError: string;
  employedInError: string;
  DesingnationError: string;
  locationError: string;
  aboutMyselfError: string;
  cityError: string;
  stateError: string;
}

export const partnerPrefernceFormValue = {
  ageFrom: '18',
  ageTo: '25',
  heightFrom: '4.10',
  heightTo: '5',
  smokingHabits: 'No',
  drinkingHabits: 'No',
  dietHabits: 'any',
  maritalStatus: 'any',
  motherTongue: 'Tamil',
  religion: 'Hindu',
  caste: '',
  subCaste: '',
  dosham: '',
  Star: 'any',
  city: 'chennai',
  state: 'TamilNadu',
  Education: 'any',
  employedIn: 'any',
  Desingnation: 'any',
  location: 'India',
  aboutMyself: '',
  physicalStatus: 'any',

  physicalStatusError: '',
  ageFromError: '',
  ageToError: '',
  heightFromError: '',
  heightToError: '',
  smokingHabitsError: '',
  drinkingHabitsError: '',
  dietHabitsError: '',
  maritalStatusError: '',
  motherTongueError: '',
  religionError: '',
  casteError: '',
  subCasteError: '',
  doshamError: '',
  StarError: '',
  EducationError: '',
  employedInError: '',
  DesingnationError: '',
  locationError: '',
  aboutMyselfError: '',
  cityError: '',
  stateError: '',
};

export interface IdVerificationvalueType {
  selectedId: string;
  idNumber: string;
  uplodedId: string;

  selectedIdError: any;
  idNumberError: string;
  uplodedIdError: string;
}

export const IdVerificationFormValue = {
  selectedId: '',
  idNumber: '',
  uplodedId: '',

  selectedIdError: '',
  idNumberError: '',
  uplodedIdError: '',
};
