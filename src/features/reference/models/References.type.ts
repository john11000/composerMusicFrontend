import { Dispatch, SetStateAction } from 'react';

export interface IObjecDrp {
  id: number;
  label: string;
  value: string;
  departmentId?: string;
}
export interface IReferences {
  id: number;
  referenceCode: string;
  referenceDescription: string;
  groupId?: number;
  groupName?: string;
  warrantyDays: number;
  publicPrice: number;
  internalCost: number;
  isVigent: boolean;
  groupReference: IObjecDrp | null;
}

export interface IReferencesContext {
  referenceToEdit: IReferences | undefined;
  setReferenceToEdit: (newReference: IReferences | undefined) => void;
  openEditReferenceDialogState: boolean;
  openEditReferenceDialog: () => void;
  closeEditReferenceDialog: () => void;
  setTitleReferenceDialog: Dispatch<SetStateAction<string>>;
  titleReferenceDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  references: IReferences[];
  setReferences: Dispatch<SetStateAction<IReferences[]>>;
}
