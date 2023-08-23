import { createContext, useState, useContext } from 'react';
import { IServicesContext, IServices } from '../models/Services.type';
import { PropsProvider } from '@/models/context.type';

export const ServicesContext = createContext<IServicesContext | undefined>(undefined);

export const ServicesProvider = ({ children }: PropsProvider) => {
  const [serviceToEdit, setServiceToEdit] = useState<IServices | undefined>();
  const [openEditServiceDialogState, setopenEditServiceDialogState] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleServiceDialog, setTitleServiceDialog] = useState<string>('Crear grupo');
  const [services, setServices] = useState<IServices[]>([]);
  const openEditServiceDialog = () => {
    setopenEditServiceDialogState(true);
  };

  const closeEditServiceDialog = () => {
    setopenEditServiceDialogState(false);
  };

  return (
    <ServicesContext.Provider
      value={{
        serviceToEdit,
        setServiceToEdit,
        openEditServiceDialogState,
        openEditServiceDialog,
        closeEditServiceDialog,
        titleServiceDialog,
        setTitleServiceDialog,
        isEdit,
        setIsEdit,
        services,
        setServices,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServicesContext = (): IServicesContext => {
  const context = useContext(ServicesContext);

  if (context === undefined) {
    throw new Error('ServicesContext debe usarse dentro de ServicesProvider');
  }

  return context;
};
