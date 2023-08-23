import { Dispatch, SetStateAction } from 'react';

export interface IDistributors {
  id: number;
  name: string;
  documentNumber: string;
  nameOfPersonInCharge: string;
  lastNameOfPersonInCharge: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
}

export interface IDistributorsContext {
  distributorToEdit: IDistributors | undefined;
  setDistributorToEdit: (newDistributor: IDistributors | undefined) => void;
  openEditDistributorDialogState: boolean;
  openEditDistributorDialog: () => void;
  closeEditDistributorDialog: () => void;
  setTitleDistributorDialog: Dispatch<SetStateAction<string>>;
  titleDistributorDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  distributors: IDistributors[];
  setDistributors: Dispatch<SetStateAction<IDistributors[]>>;
}
