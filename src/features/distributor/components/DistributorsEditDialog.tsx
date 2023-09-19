import { toastsManager } from "@/utilities";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDistributorsContext } from "../context/Distributors.context";
import useUpdateDistributor from "../hooks/useUpdateDistributors";
import { DistributorsFormEdit } from "./DistributorsFormEdit";
import { IDistributors } from "../models/Distributors.type";
import useCreateDistributor from "../hooks/useCreateDistributors";

interface Props {
  getDistributors?: () => void;
}

export default function DistributorsEditDialog({ getDistributors }: Props) {
  const { distributorToEdit, setDistributorToEdit } = useDistributorsContext();
  const { updateDistributor, loading } = useUpdateDistributor();
  const {
    openEditDistributorDialogState,
    closeEditDistributorDialog,
    titleDistributorDialog,
    isEdit,
  } = useDistributorsContext();
  const { createDistributor, loading: loadingCreate } = useCreateDistributor();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IDistributors>();

  const handleOnSave = async (data: IDistributors) => {
    try {
      let res,
        text = "Actualizado";
      if (isEdit) {
        res = await updateDistributor({
          ...data,
          id: distributorToEdit?.id || 0,
        });
      } else {
        text = "Creado";
        const newDistributor = {
          ...data,
          phoneNumber: `+57${data.phoneNumber}`,
          isActive: true,
        };
        res = await createDistributor(newDistributor);
        setDistributorToEdit(newDistributor);
      }

      if (res.data) {
        closeEditDistributorDialog();
        toastsManager.showToast(
          "success",
          "Distribuidor " + text + " Correctamente"
        );
        if (getDistributors) {
          await getDistributors();
        }
      } else {
        toastsManager.showToast("error", "Respuesta no esperada");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (openEditDistributorDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditDistributorDialogState]);

  return (
    <Dialog
      open={openEditDistributorDialogState}
      onClose={closeEditDistributorDialog}
      fullWidth
      maxWidth="md"
    >
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleDistributorDialog}</DialogTitle>
        <DialogContent>
          <DistributorsFormEdit
            register={register}
            errors={errors}
          ></DistributorsFormEdit>
        </DialogContent>
        <DialogActions>
          <Tooltip title="Guardar">
            <LoadingButton
              variant="contained"
              loading={loading || loadingCreate}
              type="submit"
            >
              Guardar
            </LoadingButton>
          </Tooltip>
          <Tooltip title="Cancelar">
            <Button
              variant="contained"
              color="inherit"
              onClick={closeEditDistributorDialog}
            >
              Cancelar
            </Button>
          </Tooltip>
        </DialogActions>
      </form>
    </Dialog>
  );
}
