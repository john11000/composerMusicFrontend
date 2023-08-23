import { Dispatch, SetStateAction } from 'react';

export interface IReportsFormState {
  dateInit: string;
  dateFinish: string;
  typeReport: string;
  departmentReport: number;
  cityReport: number;
}

export interface IReportsContext {
  reportToEdit: IReportsFormState | undefined;
  setReportToEdit: (newReport: IReportsFormState | undefined) => void;
  openEditReportDialogState: boolean;
  openEditReportDialog: () => void;
  closeEditReportDialog: () => void;
  setTitleReportDialog: Dispatch<SetStateAction<string>>;
  titleReportDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  reports: IReportsFormState[];
  setReports: Dispatch<SetStateAction<IReportsFormState[]>>;
}

export enum TypeReport {
  'Ordenes de servicios generadas' = 'órdenes de servicios generadas',
}
