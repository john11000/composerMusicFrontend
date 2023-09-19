import { Dispatch, SetStateAction } from "react";

export interface IServices {
  id: number;
  name: string;
  description: string;
}

export interface IServicesContext {
  serviceToEdit: IServices | undefined;
  setServiceToEdit: (newService: IServices | undefined) => void;
  openEditServiceDialogState: boolean;
  openEditServiceDialog: () => void;
  closeEditServiceDialog: () => void;
  setTitleServiceDialog: Dispatch<SetStateAction<string>>;
  titleServiceDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  services: IServices[];
  setServices: Dispatch<SetStateAction<IServices[]>>;
}
