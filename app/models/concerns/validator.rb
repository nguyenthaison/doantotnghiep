module Validator
  extend ActiveSupport::Concern

  VALID_PHONE_NUMBER_REGEX = /(^[\(\)\s\d+.-]+$)/
  # VALID_NAME_KANA_REGEX = /(^[\sァ-ンｧ-ﾝﾞﾟ]+$)/
  VALID_NAME_KANA_REGEX = //
  VALID_SHORT_NAME_REGEX = /(^[A-Z\d]+$)/
  VALID_LOGIN_ID_REGEX = /(^[\w]+$)/
  VALID_PASSWORD_REGEX = /(^[\x20-\x7E]+$)/
end
