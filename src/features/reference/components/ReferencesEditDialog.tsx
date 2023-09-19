import { toastsManager } from "@/utilities";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useReferencesContext } from "../context/References.context";
import useCreateReference from "../hooks/useCreateReferences";
import useUpdateReference from "../hooks/useUpdateReferences";
import { ReferencesFormEdit } from "./ReferencesFormEdit";
import { IReferences } from "../models/References.type";

interface Props {
  getReferences: () => void;
}

export default function ReferencesEditDialog({ getReferences }: Props) {
  const { referenceToEdit } = useReferencesContext();
  const { updateReference, loading } = useUpdateReference();
  const {
    openEditReferenceDialogState,
    closeEditReferenceDialog,
    titleReferenceDialog,
    isEdit,
  } = useReferencesContext();
  const { createReference, loading: loadingCreate } = useCreateReference();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = useForm<IReferences>();

  const handleOnSave = async (data: IReferences) => {
    try {
      let res,
        text = "Actualizado";
      if (isEdit) {
        res = await updateReference({
          id: referenceToEdit?.id || 0,
          referenceCode: data.referenceCode,
          referenceDescription: data.referenceDescription,
          isVigent: data.isVigent,
          warrantyDays: parseInt(data.warrantyDays + ""),
          publicPrice: parseInt(data.publicPrice + ""),
          internalCost: parseInt(data.internalCost + ""),
          groupId: data.groupReference?.id,
        });
      } else {
        text = "Creado";
        res = await createReference({
          referenceCode: data.referenceCode,
          referenceDescription: data.referenceDescription,
          isVigent: data.isVigent,
          warrantyDays: parseInt(data.warrantyDays + ""),
          publicPrice: parseInt(data.publicPrice + ""),
          internalCost: parseInt(data.internalCost + ""),
          groupId: data.groupReference?.id,
        });
      }

      if (res.data) {
        closeEditReferenceDialog();
        toastsManager.showToast(
          "success",
          "Referencias " + text + " Correctamente"
        );
        await getReferences();
      } else {
        toastsManager.showToast("error", "Respuesta no esperada");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    if (openEditReferenceDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditReferenceDialogState]);

  return (
    <Dialog
      open={openEditReferenceDialogState}
      onClose={closeEditReferenceDialog}
      fullWidth
      maxWidth="md"
    >
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleReferenceDialog}</DialogTitle>
        <DialogContent>
          <ReferencesFormEdit
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
          ></ReferencesFormEdit>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="contained"
            loading={loading || loadingCreate}
            type="submit"
          >
            Guardar
          </LoadingButton>
          <Button
            variant="contained"
            color="inherit"
            onClick={closeEditReferenceDialog}
          >
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
