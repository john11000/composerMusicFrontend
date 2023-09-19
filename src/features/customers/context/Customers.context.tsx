import { createContext, useState, useContext } from "react";
import { ICustomersContext, ICustomers } from "../models/Customers.type";
import { PropsProvider } from "@/models/context.type";

export const CustomersContext = createContext<ICustomersContext | undefined>(
  undefined
);

export const CustomersProvider = ({ children }: PropsProvider) => {
  const [customerToEdit, setCustomerToEdit] = useState<
    Partial<ICustomers> | undefined
  >();
  const [openEditCustomerDialogState, setopenEditCustomerDialogState] =
    useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleCustomerDialog, setTitleCustomerDialog] =
    useState<string>("Crear grupo");
  const [customers, setCustomers] = useState<ICustomers[]>([]);
  const [isEditCustomer, setIsEditCustomer] = useState<boolean>(true);
  const [isFromExternal, setIsFromExternal] = useState<boolean>(false);
  const [openModalCreateInvoice, setOpenModalCreateInvoice] =
    useState<boolean>(false);

  const openEditCustomerDialog = () => {
    setopenEditCustomerDialogState(true);
  };

  const closeEditCustomerDialog = () => {
    setopenEditCustomerDialogState(false);
  };
  return (
    <CustomersContext.Provider
      value={{
        customerToEdit,
        setCustomerToEdit,
        openEditCustomerDialogState,
        openEditCustomerDialog,
        closeEditCustomerDialog,
        setOpenModalCreateInvoice,
        openModalCreateInvoice,
        titleCustomerDialog,
        setTitleCustomerDialog,
        isEdit,
        setIsEdit,
        customers,
        setCustomers,
        setIsEditCustomer,
        isEditCustomer,
        setIsFromExternal,
        isFromExternal,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomersContext = (): ICustomersContext => {
  const context = useContext(CustomersContext);

  if (context === undefined) {
    throw new Error("CustomersContext debe usarse dentro de CustomersProvider");
  }

  return context;
};
