import Step1PersonalInfor from "components/HDSS/Step1PersonalInfor";
import Step2DigitalInfo from "components/HDSS/Step2DigitalInfo";
import Step3AccountInfor from "components/HDSS/Step3AccountInfor";
import Step4PhoneVerification from "components/HDSS/Step4PhoneVerification";

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

export const TYPE_DOCUMENT = [
  {
    name: "Chứng minh thư",
    value: -1,
  },
  {
    name: "Hộ chiếu",
    value: 5,
  },
  {
    name: "Bằng Lái Xe",
    value: 6,
  },
  {
    name: "Chứng minh thư quân đội",
    value: 7,
  },
];
