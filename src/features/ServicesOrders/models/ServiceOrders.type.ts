import { ICustomers } from '@/features/customers/models/Customers.type';
import { IFaultCausals } from '@/features/faultCausal/models/FaultCausals.type';
import { IFiltersFormStateInvoices, InvoiceItems } from '@/features/invoices/models/Invoices.type';
import { IObjecDrp, IReferences } from '@/features/reference/models/References.type';
import { Dispatch, SetStateAction } from 'react';

export interface POSTServiceOrders {
  customerId: number;
  technicianId: number;
  failureId: number;
  serviceId: number;
  serviceDate: string;
  serviceClosingDate?: string;
  invoiceItems: number[];
}

export interface IServiceOrders extends ICustomers {
  id: number;
  orderNumber: string;
  serviceType: string;
  orderDate: string;
  customerNit: string;
  customerName: string;
  referenceAddress: string;
  referenceNeighborhood: string;
  referenceCity: string;
  customerPhone: string;
  referenceCode: string;
  referenceDescription: string;
  distributor: string;
  purchaseDate: string;
  reportedFailure: string;
  failureCause: IFaultCausals;
  gasType: string;
  gasPressure: string;
  compliesNorm: boolean;
  startTime: string;
  endTime: string;
  part: IReferences;
  usedParts: string;
  observations: string;
  isLocked: boolean;
  attachment: File | null;
  status: ServicesOrderStateEnum;
  drpSelectServices: IObjecDrp;
  drpSelectTecnic: IObjecDrp;
  drpSelectFailure: IObjecDrp;
  invoiceItems: InvoiceItems[];
}

export interface IServiceOrdersContext {
  serviceOrderToEdit: IServiceOrders | undefined;
  setServiceOrderToEdit: (newServiceOrder: IServiceOrders | undefined) => void;
  openEditServiceOrderDialogState: boolean;
  openEditServiceOrderDialog: () => void;
  closeEditServiceOrderDialog: () => void;
  openCloseServiceOrderDialog: () => void;
  closeCloseServiceOrderDialog: () => void;
  setTitleServiceOrderDialog: Dispatch<SetStateAction<string>>;
  titleServiceOrderDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  serviceOrders: IServiceOrders[];
  setServiceOrders: Dispatch<SetStateAction<IServiceOrders[]>>;
  openCloseServiceOrderDialogState: boolean;
  action: ActionEnum;
  setActionTodo: Dispatch<SetStateAction<ActionEnum>>;
}

export interface IFiltersFormState extends IFiltersFormStateInvoices {
  state: string;
}

export enum ActionEnum {
  VER = 'VER',
  ASIGNAR_TECNICO = 'ASIGNAR_TECNICO',
  ANULAR = 'ANULAR',
  CERRAR = 'CERRAR',
  DESBLOQUEAR = 'DESBLOQUEAR',
}

export enum ServicesOrderStateEnum {
  TODAS = 'TODAS',
  ABIERTAS = 'ABIERTAS',
  CERRADAS = 'CERRADAS',
  ANULADAS = 'ANULADAS',
  ASIGNADAS = 'ASIGNADAS',
  BLOQUEADAS = 'BLOQUEADAS',
}
