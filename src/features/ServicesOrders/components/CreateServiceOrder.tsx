import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";
import { useInvoicesContext } from "@/features/invoices/context/Invoices.context";
import { useServiceOrdersContext } from "../context/ServiceOrders.context";

const CustomersDialogCreateServiceOrder = () => {
  const { openCreateServiceOrderDialogState, closeCreateServiceOrder } =
    useInvoicesContext();
  const { closeEditServiceOrderDialog } = useServiceOrdersContext();

  return (
    <Dialog
      open={openCreateServiceOrderDialogState}
      onClose={closeCreateServiceOrder}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>¿Desea crear una orden de servicio?</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          type="button"
          onClick={() => closeCreateServiceOrder()}
        >
          Sí
        </LoadingButton>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => {
            closeCreateServiceOrder();
            closeEditServiceOrderDialog();
          }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomersDialogCreateServiceOrder;
