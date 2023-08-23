import { createContext, useState, useContext } from 'react';
import { IUsersContext, IUser } from '../models/users.type';
import { PropsProvider } from '@/models/context.type';

export const UsersContext = createContext<IUsersContext | undefined>(undefined);

export const UsersProvider = ({ children }: PropsProvider) => {
  const [userToEdit, setUserToEdit] = useState<IUser | undefined>();
  const [openEditUserDialogState, setopenEditUserDialogState] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleUserDialog, setTitleUserDialog] = useState<string>('Crear Usuario');
  const [users, setUsers] = useState<IUser[]>([]);
  const openEditUserDialog = () => {
    setopenEditUserDialogState(true);
  };

  const closeEditUserDialog = () => {
    setopenEditUserDialogState(false);
  };

  return (
    <UsersContext.Provider
      value={{
        userToEdit,
        setUserToEdit,
        openEditUserDialogState,
        openEditUserDialog,
        closeEditUserDialog,
        titleUserDialog,
        setTitleUserDialog,
        isEdit,
        setIsEdit,
        users,
        setUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = (): IUsersContext => {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error('UsersContext debe usarse dentro de UsersProvider');
  }

  return context;
};
