import { toastsManager } from '@/utilities';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUsersContext } from '../context/users.context';
import useCreateUser from '../hooks/useCreateUser';
import useUpdateUser from '../hooks/useUpdateUser';
import { UserFormEdit } from './UserFormEdit';
import { IUser } from '../models/users.type';

interface Props {
  getUsers: () => void;
}

export default function EditUserDialog({ getUsers }: Props) {
  const { userToEdit } = useUsersContext();
  const { updateUser, loading } = useUpdateUser();
  const { openEditUserDialogState, closeEditUserDialog, titleUserDialog, isEdit } = useUsersContext();
  const { createUser, loading: loadingCreate } = useCreateUser();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUser>();

  const handleOnSave = async (data: IUser) => {
    try {
      let res,
        text = 'Actualizado';
      if (isEdit) {
        res = await updateUser({
          ...data,
          id: userToEdit?.id || 0,
          isActive: data.isActive?.toString() == '1' ? true : false,
          roleId: parseInt(data.roleId?.toString() || '0'),
        });
      } else {
        text = 'Creado';
        res = await createUser({ ...data, isActive: true, roleId: data.roleId });
      }

      if (res.data) {
        closeEditUserDialog();
        toastsManager.showToast('success', 'Usuario ' + text + ' Correctamente');
        await getUsers();
      } else {
        toastsManager.showToast('error', 'Respuesta no esperada');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (openEditUserDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditUserDialogState]);

  return (
    <Dialog open={openEditUserDialogState} onClose={closeEditUserDialog} fullWidth maxWidth="md">
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleUserDialog}</DialogTitle>
        <DialogContent>
          <UserFormEdit register={register} errors={errors}></UserFormEdit>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={loading || loadingCreate} type="submit">
            Guardar
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={closeEditUserDialog}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
