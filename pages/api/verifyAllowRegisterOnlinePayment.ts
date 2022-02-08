import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { getTodayWithFormat } from "commons/helpers/date";
import { writeLog } from "commons/helpers/logger";
import { IVerifyAllowRegisterOnlinePaymentResponse } from "interfaces/hdss/IVerifyAllowRegisterOnlinePayment";
import ip from "ip";
import _get from "lodash/get";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVerifyAllowRegisterOnlinePaymentResponse>
) {
  try {
    const token = _get(req, "headers.authorization");
    const url = `${API_DOMAIN}/api/hdss/verifyAllowRegisterOnlinePayment`;
    const resp: AxiosResponse<IVerifyAllowRegisterOnlinePaymentResponse> =
      await axiosWrapper.post(url, req.body, {
        headers: {
          Authorization: token,
        },
      });
    res.status(200).json(resp.data);
  } catch (e) {
    // TODO: (nghieppp) update right log
    writeLog(
      ip.address(),
      getTodayWithFormat(),
      `VerifyAllowRegisterOnlinePayment: ${_get(e, "message")}`
    );
  }
}
