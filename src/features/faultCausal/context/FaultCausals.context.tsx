import { createContext, useState, useContext } from 'react';
import { IFaultCausalsContext, IFaultCausals } from '../models/FaultCausals.type';
import { PropsProvider } from '@/models/context.type';

export const FaultCausalsContext = createContext<IFaultCausalsContext | undefined>(undefined);

export const FaultCausalsProvider = ({ children }: PropsProvider) => {
  const [faultCausalToEdit, setFaultCausalToEdit] = useState<IFaultCausals | undefined>();
  const [openEditFaultCausalDialogState, setopenEditFaultCausalDialogState] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleFaultCausalDialog, setTitleFaultCausalDialog] = useState<string>('Crear Fallas y causale');
  const [faultCausals, setFaultCausals] = useState<IFaultCausals[]>([]);
  const openEditFaultCausalDialog = () => {
    setopenEditFaultCausalDialogState(true);
  };

  const closeEditFaultCausalDialog = () => {
    setopenEditFaultCausalDialogState(false);
  };

  return (
    <FaultCausalsContext.Provider
      value={{
        faultCausalToEdit,
        setFaultCausalToEdit,
        openEditFaultCausalDialogState,
        openEditFaultCausalDialog,
        closeEditFaultCausalDialog,
        titleFaultCausalDialog,
        setTitleFaultCausalDialog,
        isEdit,
        setIsEdit,
        faultCausals,
        setFaultCausals,
      }}
    >
      {children}
    </FaultCausalsContext.Provider>
  );
};

export const useFaultCausalsContext = (): IFaultCausalsContext => {
  const context = useContext(FaultCausalsContext);

  if (context === undefined) {
    throw new Error('FaultCausalsContext debe usarse dentro de FaultCausalsProvider');
  }

  return context;
};
