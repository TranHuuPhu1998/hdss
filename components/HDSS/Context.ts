import React from 'react';

export interface IJWTInfoHDSS {
  idNumber: string;
  email: string;
  phoneNumber: string;
  refCode: string;
}
export interface IConfirmInfor {}
export interface IAdditionInfor {}

export interface ContextValue {
  jwtInfo: IJWTInfoHDSS;
  confirmInfor: IConfirmInfor;
  setConfirmInfor: (value: IConfirmInfor) => void;
  additionInfor: IAdditionInfor;
  setAdditionInfor: (value: IAdditionInfor) => void;
  ekycData: any;
  setEkycData: (value: any) => void;
}

const Context = React.createContext<ContextValue>({} as ContextValue);

export default Context;
