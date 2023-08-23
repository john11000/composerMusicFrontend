import { toastsManager } from '@/utilities';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useServicesContext } from '../context/Services.context';
import useCreateService from '../hooks/useCreateServices';
import useUpdateService from '../hooks/useUpdateServices';
import { ServicesFormEdit } from './ServicesFormEdit';
import { IServices } from '../models/Services.type';

interface Props {
  getServices: () => void;
}

export default function ServicesEditDialog({ getServices }: Props) {
  const { serviceToEdit } = useServicesContext();
  const { updateService, loading } = useUpdateService();
  const { openEditServiceDialogState, closeEditServiceDialog, titleServiceDialog, isEdit } = useServicesContext();
  const { createService } = useCreateService();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IServices>();

  const handleOnSave = async (data: IServices) => {
    try {
      let res,
        text = 'Actualizado';
      if (isEdit) {
        res = await updateService({
          id: serviceToEdit?.id || 0,
          name: data.name,
          description: data.description,
        });
      } else {
        text = 'Creado';
        res = await createService({ ...data });
      }

      if (res.data) {
        closeEditServiceDialog();
        toastsManager.showToast('success', 'Servicio ' + text + ' Correctamente');
        await getServices();
      } else {
        toastsManager.showToast('error', 'Respuesta no esperada');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    if (openEditServiceDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditServiceDialogState]);

  return (
    <Dialog open={openEditServiceDialogState} onClose={closeEditServiceDialog} fullWidth maxWidth="md">
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleServiceDialog}</DialogTitle>
        <DialogContent>
          <ServicesFormEdit register={register} errors={errors}></ServicesFormEdit>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={loading} type="submit">
            Guardar
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={closeEditServiceDialog}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
