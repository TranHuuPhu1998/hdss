import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { CheckUserEKYCResponse } from "interfaces/ICheckUserEKYS";

const MOCK_DATA = {
  resultCode: "00",
  resultMessage: "Successfully",
  hasSendOtp: false,
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckUserEKYCResponse>
) {
  // const url = `${API_DOMAIN}/api/hdbs/checkUserEkyc`;
  // const resp: AxiosResponse<GetMerchantResponse> = await axiosWrapper.post(
  //   url,
  //   req.body
  // );
  // res.status(200).json(resp.data);
  res.status(200).json(MOCK_DATA);
}
