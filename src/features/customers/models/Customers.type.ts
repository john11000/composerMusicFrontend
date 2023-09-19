import { IObjecDrp } from "@/features/reference/models/References.type";
import { Dispatch, SetStateAction } from "react";

export interface ojectDrp {
  id: number;
  value: number;
  label: string;
  departmentId?: number;
}
export interface ICustomers {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  addressDescription: string;
  neighborhood: string;
  phone: string;
  optionalPhone: string;
  departmentId: string;
  cityId: string;
  identificationNumber: string;
  departamentDrp: ojectDrp | null;
  cityDrp: ojectDrp | null;
  isActive: boolean;
  drpSelectCustomer?: IObjecDrp | null;
}

export interface ICustomersContext {
  customerToEdit: Partial<ICustomers> | undefined;
  setCustomerToEdit: (newCustomer: Partial<ICustomers> | undefined) => void;
  openEditCustomerDialogState: boolean;
  openEditCustomerDialog: () => void;
  closeEditCustomerDialog: () => void;
  setTitleCustomerDialog: Dispatch<SetStateAction<string>>;
  titleCustomerDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  customers: ICustomers[];
  setCustomers: Dispatch<SetStateAction<ICustomers[]>>;
  isEditCustomer: boolean;
  setIsEditCustomer: Dispatch<SetStateAction<boolean>>;
  isFromExternal: boolean;
  setIsFromExternal: Dispatch<SetStateAction<boolean>>;
  setOpenModalCreateInvoice: Dispatch<SetStateAction<boolean>>;
  openModalCreateInvoice: boolean;
}

export interface IDepartments {
  id: number;
  name: string;
  cities: City[];
}

export interface City {
  id: number;
  codeCity: number;
  name: string;
  departmentId: number;
}
