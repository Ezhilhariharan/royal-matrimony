export interface valueType {
  motherTongue: string;
  maritalStatus: string;
  religion: string;
  caste: string;
  subCaste: string;
  dosham: any;
  doshamYes: any;
  interCommunity: any;
  country: any;
  city: any;
  state: any;
  Children: any;
  numberOfChildren: any;

  ChildrenError: any;
  numberOfChildrenError: any;
  motherTongueError: any;
  maritalStatusError: string;
  religionError: string;
  casteError: string;
  subCasteError: string;
  doshamError: string;
  doshamYesError: string;
  interCommunityError: string;
  countryError: string;
  cityError: string;
  stateError: string;
}

export const formValue = {
  motherTongue: '',
  maritalStatus: '',
  religion: '',
  caste: '',
  subCaste: '',
  dosham: '',
  doshamYes: '',
  interCommunity: '',
  country: 'India',
  city: '',
  state: '',
  Children: '',
  numberOfChildren: '',

  ChildrenError: '',
  numberOfChildrenError: '',
  motherTongueError: '',
  maritalStatusError: '',
  religionError: '',
  casteError: '',
  subCasteError: '',
  doshamError: '',
  doshamYesError: '',
  interCommunityError: '',
  countryError: '',
  cityError: '',
  stateError: '',
};

export interface registerSecondValueType {
  height: string;
  physicalStatus: string;
  education: string;
  employedIn: string;
  occupation: string;
  currency: any;
  income: any;
  familyStatus: any;
  familyType: any;
  familyValue: any;
  ancestralOrigin: string;
  aboutMyself: string;

  heightError: string;
  physicalStatusError: string;
  educationError: string;
  employedInError: string;
  occupationError: string;
  incomeError: string;
  familyStatusError: string;
  familyTypeError: string;
  familyValueError: string;
  ancestralOriginError: string;
  aboutMyselfError: string;
}

export const registerSecondFormValue = {
  height: '',
  physicalStatus: '',
  education: '',
  employedIn: '',
  occupation: '',
  currency: 'INR',
  income: '',
  familyStatus: '',
  familyType: '',
  familyValue: '',
  ancestralOrigin: '',
  aboutMyself: '',

  heightError: '',
  physicalStatusError: '',
  educationError: '',
  employedInError: '',
  occupationError: '',
  incomeError: '',
  familyStatusError: '',
  familyValueError: '',
  familyTypeError: '',
  ancestralOriginError: '',
  aboutMyselfError: '',
};
