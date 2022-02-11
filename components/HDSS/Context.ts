import React, { SyntheticEvent } from 'react';

export interface IConfirmInfor {}
export interface IAdditionInfor {}

export interface ContextValue {
  confirmInfor: IConfirmInfor;
  setConfirmInfor: (value: IConfirmInfor) => void;
  additionInfor: IAdditionInfor;
  setAdditionInfor: (value: IAdditionInfor) => void;
  ekycData: any;
  setEkycData: (value: any) => void;
}

const Context = React.createContext<ContextValue>({} as ContextValue);

export default Context;
