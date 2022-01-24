import _get from "lodash/get";

interface EKYCData {
  idNumber: string;
  idNumberType: string;
  fullNameOcr: string;
  gender: string;
  birthDateOcr: string;
  dateOfIssueOcr: string;
  placeOfIssueOcr: string;
  expireOfIssueOcr: string;
  address: string;
  nationalityName: string;
}

export const parseInfoFromEKYC = (ekycData: any): EKYCData => {
  return {
    idNumber: _get(ekycData, "ocr.object.id", ""),
    idNumberType:
      _get(ekycData, "ocr.object.card_type") === "CĂN CƯỚC CÔNG DÂN"
        ? "CCCD"
        : "CMND",
    fullNameOcr: _get(ekycData, "ocr.object.name", ""),
    gender: _get(ekycData, "ocr.object.gender", ""),
    birthDateOcr: _get(ekycData, "ocr.object.birth_day", ""),
    dateOfIssueOcr: _get(ekycData, "ocr.object.issue_date", ""),
    placeOfIssueOcr: _get(ekycData, "ocr.object.issue_place", ""),
    expireOfIssueOcr: _get(ekycData, "ocr.object.valid_date"),
    address: _get(ekycData, "ocr.object.recent_location", ""),
    nationalityName: _get(ekycData, "ocr.object.nationality"),
  };
};

export const checkResultEkyc = (
  ekycData: any
): {
  validEKYC: boolean;
  messageEKYC: string;
} => {
  let validEKYC = true;
  let messageEKYC = "";
  const compareObj = _get(ekycData, "compare.object.msg");
  const compareMsg = _get(ekycData, "compare.object.result");

  const livenessCardBack = _get(ekycData, "liveness_card_back.object.liveness");
  const livenessCardBackMsg = _get(
    ekycData,
    "liveness_card_back.object.liveness_msg"
  );

  const livenessCardFront = _get(
    ekycData,
    "liveness_card_front.object.liveness"
  );
  const livenessCardFrontMsg = _get(
    ekycData,
    "liveness_card_front.object.liveness_msg"
  );

  const livenessFace = _get(ekycData, "liveness_face.object.liveness");
  const livenessFaceMsg = _get(ekycData, "liveness_face.object.liveness_msg");

  if (compareObj === "NOMATCH") {
    validEKYC = false;
    messageEKYC = compareMsg;
  }

  if (livenessCardBack !== "success") {
    validEKYC = false;
    messageEKYC = livenessCardBackMsg;
  }

  if (livenessCardFront !== "success") {
    validEKYC = false;
    messageEKYC = livenessCardFrontMsg;
  }

  // if (livenessFace !== "success") {
  //   validEKYC = false;
  //   messageEKYC = livenessFaceMsg;
  // }

  return {
    validEKYC,
    messageEKYC,
  };
};
