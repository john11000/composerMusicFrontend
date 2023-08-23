import { Dialog, DialogContent, DialogActions, Button, Grid, Typography, Box } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useInvoicesContext } from '../context/Invoices.context';
import InvoicesTableReferences from './InvoicesTableReferences';
import { FormatDate } from '../helpers/FormatDate';

export default function InvoicesDetails() {
  const { invoiceToEdit } = useInvoicesContext();
  const { openDetailsInvoiceDialogState, setOpenDetailsInvoiceDialog } = useInvoicesContext();

  const handleCancel = () => {
    setOpenDetailsInvoiceDialog(false);
  };

  return (
    <Dialog open={openDetailsInvoiceDialogState} onClose={handleCancel} fullWidth maxWidth="lg">
      <DialogTitle>Detalles de la Factura</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Información básica del Cliente
            </Typography>
            <Box>
              <Typography variant="body1">NIT: {invoiceToEdit?.customer?.identificationNumber}</Typography>
              <Typography variant="body1">Nombre: {invoiceToEdit?.customer?.firstName}</Typography>
              <Typography variant="body1">Dirección: {invoiceToEdit?.customer?.address}</Typography>
              <Typography variant="body1">Barrio: {invoiceToEdit?.customer?.neighborhood}</Typography>
              <Typography variant="body1">Guía-Ubicación: {invoiceToEdit?.customer?.addressDescription}</Typography>
              <Typography variant="body1">Teléfono: {invoiceToEdit?.customer?.phone}</Typography>
              <Typography variant="body1">Teléfono opcional: {invoiceToEdit?.customer?.optionalPhone}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Información básica de la Factura
            </Typography>
            <Box>
              <Typography variant="body1">Número de factura: {invoiceToEdit?.invoiceNumber}</Typography>
              <Typography variant="body1">
                Fecha de factura: {invoiceToEdit?.dateOfPurchase && FormatDate(new Date(invoiceToEdit?.dateOfPurchase))}
              </Typography>
              <Typography variant="body1">Lugar de factura: {invoiceToEdit?.placeOfPurchase}</Typography>
              Comprobante:{' '}
              <a href={invoiceToEdit?.receiptUrl} target="_blank" style={{ color: 'blue', cursor: 'pointer' }} download>
                {invoiceToEdit?.receiptKey}
              </a>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Referencias
            </Typography>
            <Box>
              <InvoicesTableReferences invoicesItem={invoiceToEdit?.invoiceItems || []} isDetails={true} />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCancel}>
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
