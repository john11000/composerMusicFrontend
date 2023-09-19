import { toastsManager } from "@/utilities";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useInvoicesContext } from "../context/Invoices.context";
import useCreateInvoice from "../hooks/useCreateInvoices";
import useUpdateInvoice from "../hooks/useUpdateInvoices";
import { CreateinvoiceContainer } from "../containers/CreateinvoiceContainer";
import { useCustomersContext } from "@/features/customers/context/Customers.context";
import usePostFile from "../hooks/usePostFile";

export default function InvoicesEditDialog() {
  const { invoiceToEdit, getInvoices } = useInvoicesContext();
  const { updateInvoice, loading } = useUpdateInvoice();
  const { setCustomerToEdit, customerToEdit } = useCustomersContext();
  const { createInvoice, loading: loadingCreate } = useCreateInvoice();
  const [activeButton, setActiveButton] = useState(false);
  const { postFile: postFileInvoiceFromApi } = usePostFile();

  const {
    openEditInvoiceDialogState,
    closeEditInvoiceDialog,
    titleInvoiceDialog,
    isEdit,
    setInvoiceToEdit,
    setIsEdit,
    openCreateServiceOrder,
  } = useInvoicesContext();

  const { isFromExternal } = useCustomersContext();

  const handleCancel = async () => {
    setCustomerToEdit(undefined);
    setInvoiceToEdit(undefined);
    setIsEdit(false);
    closeEditInvoiceDialog();
    getInvoices();
  };

  const handleOnSave = async () => {
    if (invoiceToEdit) {
      try {
        let res,
          text = "actualizada";
        const newInvoice = {
          ...invoiceToEdit,
          id: invoiceToEdit?.id ?? 0,
          userId: customerToEdit?.id ?? 0,
        };
        if (isEdit) {
          res = await updateInvoice(newInvoice);
        } else {
          text = "creada";
          res = await createInvoice(newInvoice);
        }
        if (res.data) {
          if (invoiceToEdit.file) {
            const file = new File(
              [invoiceToEdit.file],
              invoiceToEdit.file?.name,
              { lastModified: Date.now() }
            );
            await postFileInvoiceFromApi(file, res.data as { id: number });
          }
          toastsManager.showToast(
            "success",
            "Factura " + text + " correctamente"
          );
          if (isFromExternal) {
            openCreateServiceOrder(newInvoice.userId.toString());
          }
        }
        getInvoices();
        closeEditInvoiceDialog();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    setActiveButton(false);
    if (invoiceToEdit) {
      setActiveButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditInvoiceDialogState]);

  return (
    <Dialog
      open={openEditInvoiceDialogState}
      onClose={handleCancel}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle>{titleInvoiceDialog}</DialogTitle>
      <DialogContent>
        <CreateinvoiceContainer
          setActiveButton={setActiveButton}
          openEditInvoiceDialogState={openEditInvoiceDialogState}
        ></CreateinvoiceContainer>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          loading={loading || loadingCreate}
          type="button"
          onClick={() => handleOnSave()}
          disabled={!activeButton}
        >
          Guardar
        </LoadingButton>
        <Button variant="contained" color="inherit" onClick={handleCancel}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
