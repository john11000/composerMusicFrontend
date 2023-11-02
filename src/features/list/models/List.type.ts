import { Dispatch, SetStateAction } from "react";

export interface ILists {
  id: number;
  code: string;
  filename: string;
  midi_data: string;
}

export interface IListsContext {
  ListToEdit: ILists | undefined;
  setListToEdit: (newList: ILists | undefined) => void;
  openEditListDialogState: boolean;
  openEditListDialog: () => void;
  closeEditListDialog: () => void;
  setTitleListDialog: Dispatch<SetStateAction<string>>;
  titleListDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  Lists: ILists[];
  setLists: Dispatch<SetStateAction<ILists[]>>;
}
