export class StartGreaterThanTotalError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export enum Errors {
  NoToken = 'err_no_token_authorization_denied',
  InvalidToken = 'err_invalid_token',
  InvalidValue = 'err_invalid_value_for_',
  AdminRankUpdate = 'err_admin_can_not_update_mitzva_rank',

  //routes:
  FullNameRequired = 'err_fullName_is_required',
  MissingFields = 'err_missing_fields',
  FoodExists = 'err_food_exists',
  MitzvaExists = 'err_mitzva_exists',
  TitleRequired = 'err_title_required',
  AllFieldsRequired = 'err_all_fields_are_required',
  UserNotExist = 'err_user_does_not_exist',
  UserAlreadyRegistered = 'err_user_already_registered',
  InvalidPassword = 'err_invalid_password',

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
  PasswordRequired = 'err_password_required',
  WriterRequired = 'err_writer_required'
}
