import { toastsManager } from '@/utilities';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFaultCausalsContext } from '../context/FaultCausals.context';
import useCreateFaultCausal from '../hooks/useCreateFaultCausals';
import useUpdateFaultCausal from '../hooks/useUpdateFaultCausals';
import { FaultCausalsFormEdit } from './FaultCausalsFormEdit';
import { IFaultCausals } from '../models/FaultCausals.type';

interface Props {
  getFaultCausals: () => void;
}

export default function FaultCausalsEditDialog({ getFaultCausals }: Props) {
  const { faultCausalToEdit } = useFaultCausalsContext();
  const { updateFaultCausal, loading } = useUpdateFaultCausal();
  const { openEditFaultCausalDialogState, closeEditFaultCausalDialog, titleFaultCausalDialog, isEdit } =
    useFaultCausalsContext();
  const { createFaultCausal, loading: loadingCreate } = useCreateFaultCausal();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFaultCausals>();

  const handleOnSave = async (data: IFaultCausals) => {
    try {
      let res;
      const text = isEdit ? 'Actualizado' : 'Creado';

      if (isEdit) {
        res = await updateFaultCausal({
          ...data,
          id: faultCausalToEdit?.id || 0,
        });
      } else {
        res = await createFaultCausal({ ...data });
      }

      if (res.data) {
        closeEditFaultCausalDialog();
        toastsManager.showToast('success', `Fallas y causales ${text} correctamente`);
        await getFaultCausals();
      } else {
        toastsManager.showToast('error', 'Respuesta no esperada');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (openEditFaultCausalDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditFaultCausalDialogState]);

  return (
    <Dialog open={openEditFaultCausalDialogState} onClose={closeEditFaultCausalDialog} fullWidth maxWidth="md">
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleFaultCausalDialog}</DialogTitle>
        <DialogContent>
          <FaultCausalsFormEdit register={register} errors={errors}></FaultCausalsFormEdit>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={loading || loadingCreate} type="submit">
            Guardar
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={closeEditFaultCausalDialog}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
