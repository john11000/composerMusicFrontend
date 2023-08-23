import { Dispatch, SetStateAction } from 'react';

export interface IGroups {
  id: number;
  name: string;
  abbreviation: string;
}

export interface IGroupsContext {
  groupToEdit: IGroups | undefined;
  setGroupToEdit: (newGroup: IGroups | undefined) => void;
  openEditGroupDialogState: boolean;
  openEditGroupDialog: () => void;
  closeEditGroupDialog: () => void;
  setTitleGroupDialog: Dispatch<SetStateAction<string>>;
  titleGroupDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  groups: IGroups[];
  setGroups: Dispatch<SetStateAction<IGroups[]>>;
}
