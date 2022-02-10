import Step21VerifyID from './Step21VerifyID';
import Step22VerifyFace from './Step22VerifyFace';
import Step23ConfirmInformation from './Step23ConfirmInformation';
import Step24AdditionalInfor from './Step24AdditionalInfor';

// @ts-ignore
export const STEP2_VERIFY_STEPS = [
  {
    component: Step21VerifyID,
  },
  // {
  //   component: Step22VerifyFace,
  // },
  {
    component: Step23ConfirmInformation,
  },
  {
    component: Step24AdditionalInfor,
  },
];
