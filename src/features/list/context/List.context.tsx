import { createContext, useState, useContext } from "react";
import { IListsContext, ILists } from "../models/List.type";
import { PropsProvider } from "@/models/context.type";

export const ListsContext = createContext<IListsContext | undefined>(undefined);

export const ListsProvider = ({ children }: PropsProvider) => {
  const [ListToEdit, setListToEdit] = useState<ILists | undefined>();
  const [openEditListDialogState, setopenEditListDialogState] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleListDialog, setTitleListDialog] = useState<string>("Crear grupo");
  const [Lists, setLists] = useState<ILists[]>([]);
  const openEditListDialog = () => {
    setopenEditListDialogState(true);
  };

  const closeEditListDialog = () => {
    setopenEditListDialogState(false);
  };

  return (
    <ListsContext.Provider
      value={{
        ListToEdit,
        setListToEdit,
        openEditListDialogState,
        openEditListDialog,
        closeEditListDialog,
        titleListDialog,
        setTitleListDialog,
        isEdit,
        setIsEdit,
        Lists,
        setLists,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = (): IListsContext => {
  const context = useContext(ListsContext);

  if (context === undefined) {
    throw new Error("ListsContext debe usarse dentro de ListsProvider");
  }

  return context;
};
