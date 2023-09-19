import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";
import { useInvoicesContext } from "@/features/invoices/context/Invoices.context";
import { useCustomersContext } from "../context/Customers.context";

const CustomersDialogCreateInvoice = () => {
  const { openEditInvoiceDialog, setTitleInvoiceDialog } = useInvoicesContext();
  const {
    setIsEdit,
    setIsEditCustomer,
    openModalCreateInvoice,
    setOpenModalCreateInvoice,
  } = useCustomersContext();

  const closeEditCustomerDialog = () => {
    console.error("closeEditCustomerDialog");
  };

  const openModalCreateInvoiceState = () => {
    setIsEdit(true);
    setTitleInvoiceDialog("Añadir Facturas");
    // setCustomerToEdit(customers[dataTable.rowIndex]);
    openEditInvoiceDialog();
    setIsEditCustomer(false);
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
            openModalCreateInvoiceState();
            setOpenModalCreateInvoice(false);
          }}
        >
          Sí
        </LoadingButton>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => setOpenModalCreateInvoice(false)}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomersDialogCreateInvoice;
