import { createContext, useState, useContext } from 'react';
import { IReferencesContext, IReferences } from '../models/References.type';
import { PropsProvider } from '@/models/context.type';

export const ReferencesContext = createContext<IReferencesContext | undefined>(undefined);

export const ReferencesProvider = ({ children }: PropsProvider) => {
  const [referenceToEdit, setReferenceToEdit] = useState<IReferences | undefined>();
  const [openEditReferenceDialogState, setopenEditReferenceDialogState] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleReferenceDialog, setTitleReferenceDialog] = useState<string>('Crear referencia');
  const [references, setReferences] = useState<IReferences[]>([]);
  const openEditReferenceDialog = () => {
    setopenEditReferenceDialogState(true);
  };

  const closeEditReferenceDialog = () => {
    setopenEditReferenceDialogState(false);
  };

  return (
    <ReferencesContext.Provider
      value={{
        referenceToEdit,
        setReferenceToEdit,
        openEditReferenceDialogState,
        openEditReferenceDialog,
        closeEditReferenceDialog,
        titleReferenceDialog,
        setTitleReferenceDialog,
        isEdit,
        setIsEdit,
        references,
        setReferences,
      }}
    >
      {children}
    </ReferencesContext.Provider>
  );
};

export const useReferencesContext = (): IReferencesContext => {
  const context = useContext(ReferencesContext);

  if (context === undefined) {
    throw new Error('ReferencesContext debe usarse dentro de ReferencesProvider');
  }

  return context;
};
