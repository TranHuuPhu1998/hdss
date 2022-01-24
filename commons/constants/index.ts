export const ENABLE_WRITE_LOG = process.env.ENABLE_WRITE_LOG_CLIENT;
export const API_DOMAIN = process.env.API_DOMAIN_CLIENT;
export const PARTNER_ID = process.env.PARTNER_ID_CLIENT;
export const KEY_CHECK_SUM = process.env.KEY_CHECK_SUM_CLIENT;
export const CHANNEL_HDBS = process.env.CHANNEL_HDBS_CLIENT;
export const TOKEN_USERNAME = process.env.TOKEN_USERNAME_CLIENT;
export const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD_CLIENT;

export const API_DOMAIN_SBH_SANDBOX = process.env.API_DOMAIN_SANDBOX_SBH_CLIENT;
export const CHANNEL_SBH = process.env.CHANNEL_CLIENT;
export const SERVICE_CODE_SBH = process.env.SERVICE_CODE_CLIENT;
export const NARRATIVE_SBH = process.env.NARRATIVE_CLIENT;
export const IS_REQ_CHAL_CODE_SBH = process.env.IS_REQ_CHAL_CODE_CLIENT;
export const LANGUAGE = {
  VI: "vi",
  EN: "en",
};

export const KEY_TOKEN = "HDBS_TOKEN";

export const ERROR_CODE_WITH_MESSAGE = {
  "00": "Success",
  "01": "PartnerId not found",
  "02": "Merchant not found",
  "03": "Terminal not found",
  "04": "User eKYC not found",
  "05": "Private key not found",
  "06": "Ekyc user already exists",
  "07": "Register eKyc user failed",
  "08": "Ekyc account already exists",
  "09": "Account otp not match",
  "10": "Ekyc account not found",
  "99": "System error",
  "98": "RequestId is required",
  "97": "Channel is required",
  "96": "Language is required",
  "95": "Transaction time is required",
  "94": "PartnerId is required",
  "93": "Checksum is required",
  "92": "Invalid transaction time",
  "91": "Invalid checksum",
  "90": "Can not get merchant",
  "89": "UserId is required",
  "88": "Client no is required",
  "87": "MerchantId is required",
  "86": "TerminalId is required",
  "85": "Esb check user ekyc failed",
  "84": "Esb Insert ekyc account failed",
  "83": "Account otp is required",
  "82": "Esb confirm ekyc present failed",
  "81": "HDBS register user failed",
  "80": "Esb Update ekyc account failed",
  "79": "Token is required",
  "78": "Username is required",
  "77": " Password is required",
  "76": "Username or password incorrect",
  "75": "Ekyc type is required",
  "74": "Invalid ekyc type",
  "73": "Email is required",
  "72": "Account no is required",
  "71": "Phone number is required",
  "70": "Full name is required",
  "69": "Birth day is required",
  "68": "Full name ocr is required",
  "67": "Birth day ocr is required",
  "66": "Date of issue is required",
  "65": "Date of issue ocr is required",
  "64": "Place of issue is required",
  "63": "Place of issue ocr is required",
  "62": "Expired of issue is required",
  "61": "Expired of issue ocr is required",
  "60": "Gender is required",
  "59": "Address is required",
  "58": "Current address is required",
  "57": "Nationality is required",
  "56": "Branch is required",
  "55": "Marital status is required",
  "54": "Face matching is required",
  "53": "Id number is required",
  "52": "Id number type is required",
  "51": "Esb inquiry ekyc present failed",
  "50": "Invalid method",
  "49": "Invalid request",
};
