import { Dispatch, SetStateAction } from 'react';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  identificationNumber?: string;
  location?: string;
  isActive?: boolean;
  roleId?: number;
}

export interface IUsersContext {
  userToEdit: IUser | undefined;
  setUserToEdit: (newUser: IUser | undefined) => void;
  openEditUserDialogState: boolean;
  openEditUserDialog: () => void;
  closeEditUserDialog: () => void;
  setTitleUserDialog: Dispatch<SetStateAction<string>>;
  titleUserDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

export const roles: string[] = ['Administrador', 'Auxiliar', 'Técnico', 'Cliente'];
