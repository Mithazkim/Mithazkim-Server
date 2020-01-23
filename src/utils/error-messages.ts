enum Errors {
  NoToken = 'No token, authorization denied',
  InvalidToken = 'Token is not valid',

  InvalidValue = 'err_invalid_value_for_',
  MiddlewareException = 'Exception caught in error middleware - ',

  //routes:
  FullName = 'fullName is required',
  MissingFields = 'err_missing_fields',
  FoodExists = 'err_food_exists',
  MitzvaExists = 'err_mitzva_exists',
  TitleRequired = 'err_title_required',
  AllFieldsRequired = 'all fields are required',
  UserNotExist = 'user does not exist',
  UserAlreadyRegistered = 'user already registered',
  InvalidPassword = 'invalid password',

  //managers:
  StartGreaterThenTotal = 'err_start_greater_than_total',

  //models:
  BerakhahShortNameRequired = 'err_berakhah_shortName_required',
  BerakhahFullNameRequired = 'err_berakhah_fullName_required',
  FoodNameRequired = 'err_food_name_required',
  FoodBerakhahIdRequired = 'err_food_berakhahId_required',
  MitzvaTitleRequired = 'err_mitzva_title_required',
  MitzvaCategoryIdRequired = 'err_mitzva_categoryId_required',
  CategoryTitleRequired = 'err_category_title_required',
  UserNameRequired = 'err_username_required',
  PasswordRequired = 'err_password_required'
}

export default Errors;
