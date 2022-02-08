import Step1PersonalInfor from "components/core/OnlinePayment/Step1PersonalInfor";
import Step2DigitalInfo from "components/core/OnlinePayment/Step2DigitalInfo";
import Step3AccountInfor from "components/core/OnlinePayment/Step3AccountInfor";
import Step4PhoneVerification from "components/core/OnlinePayment/Step4PhoneVerification";

export const STEPS = [
  {
    component: Step1PersonalInfor,
  },
  {
    component: Step2DigitalInfo,
  },
  {
    component: Step3AccountInfor,
  },
  {
    component: Step4PhoneVerification,
  },
];

export const STEP_INFORMATIONS = [
  "Xác thực điện tử",
  "Xác nhận thông tin",
  "Thông tin bổ sung",
];
