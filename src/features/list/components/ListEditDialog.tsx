import { toastsManager } from "@/utilities";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useListsContext } from "../context/List.context";
import useCreateList from "../hooks/useCreateList";
import useUpdateList from "../hooks/useUpdateList";
import { ListsFormEdit } from "./ListFormEdit";
import { ILists } from "../models/List.type";

interface Props {
  getLists: () => void;
}

export default function ListsEditDialog({ getLists }: Props) {
  const { ListToEdit } = useListsContext();
  const { updateList, loading } = useUpdateList();
  const {
    openEditListDialogState,
    closeEditListDialog,
    titleListDialog,
    isEdit,
  } = useListsContext();
  const { createList, loading: loadingCreate } = useCreateList();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILists>();

  const handleOnSave = async (data: ILists) => {
    try {
      let res,
        text = "Actualizado";
      if (isEdit) {
        res = await updateList({
          ...data,
          id: ListToEdit?.id || 0,
        });
      } else {
        text = "Creado";
        res = await createList({
          ...data,
          abbreviation: ListToEdit?.abbreviation || "",
        });
      }

      if (res.data) {
        closeEditListDialog();
        toastsManager.showToast("success", "Grupo " + text + " Correctamente");
        await getLists();
      } else {
        toastsManager.showToast("error", "Respuesta no esperada");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (openEditListDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditListDialogState]);

  return (
    <Dialog
      open={openEditListDialogState}
      onClose={closeEditListDialog}
      fullWidth
      maxWidth="md"
    >
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleListDialog}</DialogTitle>
        <DialogContent>
          <ListsFormEdit register={register} errors={errors}></ListsFormEdit>
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
            onClick={closeEditListDialog}
          >
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
