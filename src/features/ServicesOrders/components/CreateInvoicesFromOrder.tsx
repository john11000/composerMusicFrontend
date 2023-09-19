import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";
import { useCustomersContext } from "@/features/customers/context/Customers.context";
import { useInvoicesContext } from "@/features/invoices/context/Invoices.context";

const CustomersDialogCreateInvoice = () => {
  const { openModalCreateInvoice, setOpenModalCreateInvoice } =
    useCustomersContext();
  const { openEditInvoiceDialog } = useInvoicesContext();

  const closeEditCustomerDialog = () => {
    setOpenModalCreateInvoice(false);
  };

  return (
    <Dialog
      open={openModalCreateInvoice}
      onClose={closeEditCustomerDialog}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>¿Desea crear factura al cliente?</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          type="button"
          onClick={() => {
            openEditInvoiceDialog();
            setOpenModalCreateInvoice(false);
          }}
        >
          Sí
        </LoadingButton>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => closeEditCustomerDialog()}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomersDialogCreateInvoice;
