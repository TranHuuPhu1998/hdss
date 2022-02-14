export interface CheckEligibleRequest {
  partnerId: string;
  requesID: string;
  requestTime: Date;
  data: {
    campaignId: string;
    email: string;
    mobilephone1: string;
    nationalId: string;
    fullName: string;
    deviceType: string;
    appVersion: string;
    captchaCode: string;
    jwtToken: string;
  };
}

export interface CheckEligibleResponse {}
