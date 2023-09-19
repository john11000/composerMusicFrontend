import { createContext, useState, useContext } from "react";
import { IReportsContext, IReportsFormState } from "../models/Reports.type";
import { PropsProvider } from "@/models/context.type";

export const ReportsContext = createContext<IReportsContext | undefined>(
  undefined
);

export const ReportsProvider = ({ children }: PropsProvider) => {
  const [reportToEdit, setReportToEdit] = useState<
    IReportsFormState | undefined
  >();
  const [openEditReportDialogState, setopenEditReportDialogState] =
    useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleReportDialog, setTitleReportDialog] =
    useState<string>("Crear Reporte");
  const [reports, setReports] = useState<IReportsFormState[]>([]);
  const openEditReportDialog = () => {
    setopenEditReportDialogState(true);
  };

  const closeEditReportDialog = () => {
    setopenEditReportDialogState(false);
  };

  return (
    <ReportsContext.Provider
      value={{
        reportToEdit,
        setReportToEdit,
        openEditReportDialogState,
        openEditReportDialog,
        closeEditReportDialog,
        titleReportDialog,
        setTitleReportDialog,
        isEdit,
        setIsEdit,
        reports,
        setReports,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const useReportsContext = (): IReportsContext => {
  const context = useContext(ReportsContext);

  if (context === undefined) {
    throw new Error("ReportsContext debe usarse dentro de ReportsProvider");
  }

  return context;
};
