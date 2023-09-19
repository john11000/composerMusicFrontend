import { createContext, useState, useContext } from "react";
import {
  IServiceOrdersContext,
  IServiceOrders,
  ActionEnum,
} from "../models/ServiceOrders.type";
import { PropsProvider } from "@/models/context.type";

export const ServiceOrdersContext = createContext<
  IServiceOrdersContext | undefined
>(undefined);

export const ServiceOrdersProvider = ({ children }: PropsProvider) => {
  const [serviceOrderToEdit, setServiceOrderToEdit] = useState<
    IServiceOrders | undefined
  >();
  const [openEditServiceOrderDialogState, setopenEditServiceOrderDialogState] =
    useState(false);
  const [
    openCloseServiceOrderDialogState,
    setopenCloseServiceOrderDialogState,
  ] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleServiceOrderDialog, setTitleServiceOrderDialog] =
    useState<string>("");
  const [action, setActionTodo] = useState<ActionEnum>(
    ActionEnum.ASIGNAR_TECNICO
  );
  const [serviceOrders, setServiceOrders] = useState<IServiceOrders[]>([]);
  const openEditServiceOrderDialog = () => {
    setopenEditServiceOrderDialogState(true);
  };

  const closeEditServiceOrderDialog = () => {
    setopenEditServiceOrderDialogState(false);
  };

  const openCloseServiceOrderDialog = () => {
    setopenCloseServiceOrderDialogState(true);
  };

  const closeCloseServiceOrderDialog = () => {
    setopenCloseServiceOrderDialogState(false);
  };

  return (
    <ServiceOrdersContext.Provider
      value={{
        action,
        setActionTodo,
        serviceOrderToEdit,
        setServiceOrderToEdit,
        openEditServiceOrderDialogState,
        openEditServiceOrderDialog,
        closeEditServiceOrderDialog,
        titleServiceOrderDialog,
        setTitleServiceOrderDialog,
        isEdit,
        setIsEdit,
        serviceOrders,
        setServiceOrders,
        openCloseServiceOrderDialog,
        closeCloseServiceOrderDialog,
        openCloseServiceOrderDialogState,
      }}
    >
      {children}
    </ServiceOrdersContext.Provider>
  );
};

export const useServiceOrdersContext = (): IServiceOrdersContext => {
  const context = useContext(ServiceOrdersContext);

  if (context === undefined) {
    throw new Error(
      "ServiceOrdersContext debe usarse dentro de ServiceOrdersProvider"
    );
  }

  return context;
};
