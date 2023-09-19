// import { toastsManager } from '@/utilities';
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useServiceOrdersContext } from "../context/ServiceOrders.context";
// import useCreateServiceOrder from '../hooks/useCreateServiceOrders';
// import useUpdateServiceOrder from '../hooks/useUpdateServiceOrders';
import { ActionEnum, IServiceOrders } from "../models/ServiceOrders.type";
import { ServiceOrdersClose } from "./ServiceOrdersClose";
import { ServiceOrdersAsignTecnicForm } from "./ServiceOrdersAsignTecnicForm";
import { ServiceOrdersAnulateForm } from "./ServiceOrdersAnulateForm";
import { IUser } from "@/features/users/models/users.type";

type props = {
  users: IUser[];
};
export default function ServiceOrdersModal({ users }: props) {
  // const { serviceOrderToEdit } = useServiceOrdersContext();
  // const { updateServiceOrder, loading } = useUpdateServiceOrder();
  const {
    openCloseServiceOrderDialogState,
    closeCloseServiceOrderDialog,
    titleServiceOrderDialog,
    action,
  } = useServiceOrdersContext();
  // const { createServiceOrder, loading: loadingCreate } = useCreateServiceOrder();
  const { reset, handleSubmit } = useForm<IServiceOrders>();

  const handleOnSave = async (data: IServiceOrders) => {
    //eslint-disable-next-line
    console.log(data);
    // try {
    //   let res,
    //     text = 'Actualizado';
    //   if (isEdit) {
    //     res = await updateServiceOrder({
    //       ...data,
    //       id: serviceOrderToEdit?.id || 0,
    //     });
    //   } else {
    //     text = 'Creado';
    //     res = await createServiceOrder({ ...data });
    //   }
    //   if (res.data) {
    //     closeCloseServiceOrderDialog();
    //     toastsManager.showToast('success', 'Ordenes de Servicios ' + text + ' Correctamente');
    //     // await getServiceOrders();
    //   } else {
    //     toastsManager.showToast('error', 'Respuesta no esperada');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    if (openCloseServiceOrderDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCloseServiceOrderDialogState]);

  const renderForm = () => {
    switch (action) {
      case ActionEnum.ASIGNAR_TECNICO:
        return <ServiceOrdersAsignTecnicForm users={users} />;
      case ActionEnum.VER:
        return <div>Descargando archivo</div>;
      case ActionEnum.CERRAR:
        return <ServiceOrdersClose></ServiceOrdersClose>;
      case ActionEnum.DESBLOQUEAR:
        return <div>Desbloquear orden de servicios</div>;
      case ActionEnum.ANULAR:
        return <ServiceOrdersAnulateForm />;
      default:
        return <div></div>;
    }
  };

  return (
    <Box>
      <Dialog
        open={openCloseServiceOrderDialogState}
        onClose={closeCloseServiceOrderDialog}
        fullWidth
        maxWidth="lg"
      >
        <form noValidate onSubmit={handleSubmit(handleOnSave)}>
          <DialogTitle>{titleServiceOrderDialog}</DialogTitle>
          <DialogContent>
            <div>{renderForm()}</div>
          </DialogContent>
          <DialogActions>
            {/* <LoadingButton variant="contained" loading={loading || loadingCreate} type="submit">
             */}
            <LoadingButton variant="contained" type="submit">
              {action.replace && action.replace("_", " ")}
            </LoadingButton>
            <Button
              variant="contained"
              color="inherit"
              onClick={closeCloseServiceOrderDialog}
            >
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
