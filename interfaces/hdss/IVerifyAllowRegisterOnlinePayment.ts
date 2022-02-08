export interface IVerifyAllowRegisterOnlinePaymentRequest {
  requestId: string;
}

export interface IVerifyAllowRegisterOnlinePaymentResponse {
  resultCode: string;
  resultMessage: string;
  hasSendOtp: boolean;
}
