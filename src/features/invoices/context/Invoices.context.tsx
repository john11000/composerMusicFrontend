import { createContext, useState, useContext } from "react";
import { IinvoicesContext, Iinvoices } from "../models/Invoices.type";
import { PropsProvider } from "@/models/context.type";
import useGetInvoices from "../hooks/useGetInvoices";

export const InvoicesContext = createContext<IinvoicesContext | undefined>(
  undefined
);

export const InvoicesProvider = ({ children }: PropsProvider) => {
  const [invoiceToEdit, setInvoiceToEdit] = useState<Iinvoices | undefined>();
  const [openEditInvoiceDialogState, setopenEditInvoiceDialogState] =
    useState(false);
  const [openDetailsInvoiceDialogState, setOpenDetailsInvoiceDialog] =
    useState(false);
  const [openCreateServiceOrderDialogState, setOpenCreateServiceOrderDialog] =
    useState(false);
  const [customerIdentification, setCustomerIdentification] =
    useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleInvoiceDialog, setTitleInvoiceDialog] =
    useState<string>("Crear Factura");
  const [invoices, setInvoices] = useState<Iinvoices[]>([]);
  const { getInvoices: getInvoicesFromApi } = useGetInvoices();

  const getInvoices = async () => {
    try {
      const res = await getInvoicesFromApi();
      if (res.data) {
        setInvoices(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateServiceOrder = (identificationNumber: string) => {
    setOpenCreateServiceOrderDialog(true);
    setCustomerIdentification(identificationNumber);
  };

  const closeCreateServiceOrder = () => {
    setOpenCreateServiceOrderDialog(false);
  };

  const openEditInvoiceDialog = () => {
    setopenEditInvoiceDialogState(true);
  };

  const closeEditInvoiceDialog = () => {
    setopenEditInvoiceDialogState(false);
  };

  return (
    <InvoicesContext.Provider
      value={{
        openDetailsInvoiceDialogState,
        setOpenDetailsInvoiceDialog,
        invoiceToEdit,
        setInvoiceToEdit,
        openEditInvoiceDialogState,
        openEditInvoiceDialog,
        closeEditInvoiceDialog,
        titleInvoiceDialog,
        setTitleInvoiceDialog,
        isEdit,
        setIsEdit,
        invoices,
        setInvoices,
        getInvoices,
        openCreateServiceOrderDialogState,
        openCreateServiceOrder,
        closeCreateServiceOrder,
        customerIdentification,
        setCustomerIdentification,
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
};

export const useInvoicesContext = (): IinvoicesContext => {
  const context = useContext(InvoicesContext);

  if (context === undefined) {
    throw new Error("InvoicesContext debe usarse dentro de InvoicesProvider");
  }

  return context;
};
