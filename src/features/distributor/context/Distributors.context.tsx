import { createContext, useState, useContext } from "react";
import {
  IDistributorsContext,
  IDistributors,
} from "../models/Distributors.type";
import { PropsProvider } from "@/models/context.type";

export const DistributorsContext = createContext<
  IDistributorsContext | undefined
>(undefined);

export const DistributorsProvider = ({ children }: PropsProvider) => {
  const [distributorToEdit, setDistributorToEdit] = useState<
    IDistributors | undefined
  >();
  const [openEditDistributorDialogState, setopenEditDistributorDialogState] =
    useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleDistributorDialog, setTitleDistributorDialog] = useState<string>(
    "Crear Distribuidore"
  );
  const [distributors, setDistributors] = useState<IDistributors[]>([]);
  const openEditDistributorDialog = () => {
    setopenEditDistributorDialogState(true);
  };

  const closeEditDistributorDialog = () => {
    setopenEditDistributorDialogState(false);
  };

  return (
    <DistributorsContext.Provider
      value={{
        distributorToEdit,
        setDistributorToEdit,
        openEditDistributorDialogState,
        openEditDistributorDialog,
        closeEditDistributorDialog,
        titleDistributorDialog,
        setTitleDistributorDialog,
        isEdit,
        setIsEdit,
        distributors,
        setDistributors,
      }}
    >
      {children}
    </DistributorsContext.Provider>
  );
};

export const useDistributorsContext = (): IDistributorsContext => {
  const context = useContext(DistributorsContext);

  if (context === undefined) {
    throw new Error(
      "DistributorsContext debe usarse dentro de DistributorsProvider"
    );
  }

  return context;
};
