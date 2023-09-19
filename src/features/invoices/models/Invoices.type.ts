import { IDistributors } from "@/features/distributor/models/Distributors.type";
import {
  IObjecDrp,
  IReferences,
} from "@/features/reference/models/References.type";
import { Dispatch, SetStateAction } from "react";

export interface IinvoicesContext {
  invoiceToEdit: Iinvoices | undefined;
  setInvoiceToEdit: (newInvoice: Iinvoices | undefined) => void;
  openEditInvoiceDialogState: boolean;
  openEditInvoiceDialog: () => void;
  closeEditInvoiceDialog: () => void;
  setTitleInvoiceDialog: Dispatch<SetStateAction<string>>;
  titleInvoiceDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  invoices: Iinvoices[];
  setInvoices: Dispatch<SetStateAction<Iinvoices[]>>;
  openDetailsInvoiceDialogState: boolean;
  setOpenDetailsInvoiceDialog: Dispatch<SetStateAction<boolean>>;
  openCreateServiceOrderDialogState: boolean;
  openCreateServiceOrder: (identificationNumber: string) => void;
  closeCreateServiceOrder: () => void;
  customerIdentification: string;
  setCustomerIdentification: Dispatch<SetStateAction<string>>;
  getInvoices: () => void;
}
export interface Iinvoices {
  id: number;
  invoiceNumber: string;
  placeOfPurchase: string;
  dateOfPurchase: string;
  userId: number;
  distributorId?: number;
  invoiceItems: InvoiceItems[];
  customer: User | null;
  distributor: IDistributors | null;
  file: Blob;
  auxDrpDistributor?: IObjecDrp | null;
  receiptUrl: string;
  receiptKey: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  location?: string;
  address: string;
  addressDescription: string;
  neighborhood: string;
  phone: string;
  optionalPhone: string;
  departmentId: number;
  cityId: number;
  identificationNumber: string;
  roleId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  drpSelectCustomer?: IObjecDrp | null;
}

export interface InvoiceItems extends IReferences {
  id: number;
  invoiceId: number;
  productId: number;
  isActive: boolean;
  quantity: number;
  unitValue: number;
  serial: string;
  address: string;
  referenceCode: string;
  referenceDescription: string;
  warrantyDays: number;
  auxDrp: IObjecDrp | null;
  location: string;
  neighborhood: string;
  optionalPhone: string;
  cityDrp: IObjecDrp | null;
  departamentDrp: IObjecDrp | null;
  principalPhone: string;
  product: IReferences;
  cityId: number;
  contact: string;
  typeLocation: string;
  locationNumber: string;
  numberLocation: string;
  secondNumberLocation: string;
}

export interface IFiltersFormStateInvoices {
  identificationNumber: string;
  referenceDescription: string;
  address: string;
}

export enum EnumPlaceOfPurchase {
  "CLASIC" = "CLASIC",
  "DISTRIBUIDOR" = "distribuidor",
}
