import { Dispatch, SetStateAction } from 'react';

export interface IFaultCausals {
  id: number;
  errorCode: string;
  description: string;
  cause: string;
}

export interface IFaultCausalsContext {
  faultCausalToEdit: IFaultCausals | undefined;
  setFaultCausalToEdit: (newFaultCausal: IFaultCausals | undefined) => void;
  openEditFaultCausalDialogState: boolean;
  openEditFaultCausalDialog: () => void;
  closeEditFaultCausalDialog: () => void;
  setTitleFaultCausalDialog: Dispatch<SetStateAction<string>>;
  titleFaultCausalDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  faultCausals: IFaultCausals[];
  setFaultCausals: Dispatch<SetStateAction<IFaultCausals[]>>;
}
