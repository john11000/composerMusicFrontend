import { toastsManager } from '@/utilities';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGroupsContext } from '../context/Groups.context';
import useCreateGroup from '../hooks/useCreateGroups';
import useUpdateGroup from '../hooks/useUpdateGroups';
import { GroupsFormEdit } from './GroupsFormEdit';
import { IGroups } from '../models/Groups.type';

interface Props {
  getGroups: () => void;
}

export default function GroupsEditDialog({ getGroups }: Props) {
  const { groupToEdit } = useGroupsContext();
  const { updateGroup, loading } = useUpdateGroup();
  const { openEditGroupDialogState, closeEditGroupDialog, titleGroupDialog, isEdit } = useGroupsContext();
  const { createGroup, loading: loadingCreate } = useCreateGroup();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IGroups>();

  const handleOnSave = async (data: IGroups) => {
    try {
      let res,
        text = 'Actualizado';
      if (isEdit) {
        res = await updateGroup({
          ...data,
          id: groupToEdit?.id || 0,
        });
      } else {
        text = 'Creado';
        res = await createGroup({ ...data, abbreviation: groupToEdit?.abbreviation || '' });
      }

      if (res.data) {
        closeEditGroupDialog();
        toastsManager.showToast('success', 'Grupo ' + text + ' Correctamente');
        await getGroups();
      } else {
        toastsManager.showToast('error', 'Respuesta no esperada');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (openEditGroupDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditGroupDialogState]);

  return (
    <Dialog open={openEditGroupDialogState} onClose={closeEditGroupDialog} fullWidth maxWidth="md">
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleGroupDialog}</DialogTitle>
        <DialogContent>
          <GroupsFormEdit register={register} errors={errors}></GroupsFormEdit>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={loading || loadingCreate} type="submit">
            Guardar
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={closeEditGroupDialog}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
