export const isValidLogin = (stateValue: any) => {
  let isValid = true,
    newForm = {...stateValue};

  if (!newForm.mail)
    (newForm.mailError = 'Mail,Id or Mobile number is required'),
      (isValid = false);
  if (!newForm.password)
    (newForm.passwordError = 'password is required'), (isValid = false);
  if (
    newForm.password &&
    !newForm.password.match(
      /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*[@&*])[A-Za-z0-9@&*]{8,}$/,
    )
  )
    (newForm.passwordError = 'Valid password is required'), (isValid = false);

  return [isValid, newForm];
};

export const isValidRegister = (stateValue: any) => {
  let isValid = true,
    newForm = {...stateValue};

  if (!newForm.mail)
    (newForm.mailError = 'Mail Id or Mobile number is required'),
      (isValid = false);
  if (!newForm.profile)
    (newForm.profileError = 'Profile is required'), (isValid = false);
  if (!newForm.firstName)
    (newForm.firstNameError = 'FirstName is required'), (isValid = false);
  if (newForm.firstName.length < 4)
    (newForm.firstNameError = 'FirstName should contain min 4 char'),
      (isValid = false);
  if (!newForm.lastName)
    (newForm.lastNameError = 'LastName is required'), (isValid = false);
  if (newForm.lastName.length < 1)
    (newForm.passwordError = 'LastName should contain min 1 char'),
      (isValid = false);
  if (!newForm.gender)
    (newForm.genderError = 'Gender is required'), (isValid = false);
  if (!newForm.dateOfBirth)
    (newForm.dateOfBirthError = 'DateOfBirth is required'), (isValid = false);
  if (!newForm.mobileNumber)
    (newForm.mobileNumberError = 'MobileNumber is required'), (isValid = false);
  if (!newForm.mail)
    (newForm.mailError = 'Mail Id or Mobile number is required'),
      (isValid = false);
  if (!newForm.password)
    (newForm.passwordError = 'Password is required'), (isValid = false);
  if (newForm.password.length < 8)
    (newForm.passwordError = 'Password should contain min 8 char'),
      (isValid = false);
  if (
    newForm.password &&
    !newForm.password.match(
      /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*[@&*])[A-Za-z0-9@&*]{8,}$/,
    )
  )
    (newForm.passwordError = 'Valid password is required'), (isValid = false);
  if (!newForm.passwordConfirmation)
    (newForm.passwordConfirmationError = 'Password Verification is required'),
      (isValid = false);
  if (newForm.passwordConfirmation.length < 8)
    (newForm.passwordConfirmationError =
      'Password Verification should contain min 8 char'),
      (isValid = false);
  if (
    newForm.passwordConfirmation &&
    !newForm.passwordConfirmation.match(
      /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*[@&*])[A-Za-z0-9@&*]{8,}$/,
    )
  )
    (newForm.passwordError = 'Valid password is required'), (isValid = false);
  if (newForm.password != newForm.passwordConfirmation)
    (newForm.passwordError = 'Password and Confirm password should be same'),
      (isValid = false);

  return [isValid, newForm];
};

export const isValidOnboardPageOne = (stateValue: any) => {
  let isValid = true,
    newForm = {...stateValue};

  if (!newForm.motherTongue)
    (newForm.motherTongueError = 'Mother Tongue is required'),
      (isValid = false);
  if (!newForm.maritalStatus)
    (newForm.maritalStatusError = 'Marital Status is required'),
      (isValid = false);
  if (!newForm.religion)
    (newForm.religionError = 'Religion is required'), (isValid = false);
  if (!newForm.caste)
    (newForm.casteError = 'Caste is required'), (isValid = false);
  if (!newForm.subCaste)
    (newForm.subCasteError = 'Sub Caste is required'), (isValid = false);
  // if (!newForm.doshamYes) newForm.doshamYesError = 'Dosham is required', isValid = false
  // if (!newForm.interCommunity) newForm.mobileNumberError = 'interCommunity is required', isValid = false
  if (!newForm.country)
    (newForm.countryError = 'Country is required'), (isValid = false);
  if (!newForm.city)
    (newForm.cityError = 'City is required'), (isValid = false);
  if (!newForm.state)
    (newForm.stateError = 'State is required'), (isValid = false);

  return [isValid, newForm];
};

export const isValidOnboardPageTwo = (stateValue: any) => {
  let isValid = true,
    newForm = {...stateValue};

  if (!newForm.height)
    (newForm.heightError = 'Height is required'), (isValid = false);
  if (!newForm.physicalStatus)
    (newForm.physicalStatusError = 'Physical Status is required'),
      (isValid = false);
  if (!newForm.education)
    (newForm.educationError = 'Education is required'), (isValid = false);
  if (!newForm.employedIn)
    (newForm.employedInError = 'Employed is required'), (isValid = false);
  if (!newForm.occupation)
    (newForm.occupationError = 'Occupation is required'), (isValid = false);
  if (!newForm.income)
    (newForm.incomeError = 'Income is required'), (isValid = false);
  if (!newForm.familyStatus)
    (newForm.familyStatusError = 'FamilyStatus is required'), (isValid = false);
  if (!newForm.familyType)
    (newForm.familyTypeError = 'FamilyType is required'), (isValid = false);
  if (!newForm.familyValue)
    (newForm.familyValueError = 'FamilyValue is required'), (isValid = false);
  if (!newForm.ancestralOrigin)
    (newForm.ancestralOriginError = 'AncestralOrigin is required'),
      (isValid = false);
  if (!newForm.aboutMyself)
    (newForm.aboutMyselfError = 'AboutMyself is required'), (isValid = false);

  return [isValid, newForm];
};
