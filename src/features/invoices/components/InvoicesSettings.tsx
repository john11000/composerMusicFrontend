import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useInvoicesContext } from '../context/Invoices.context';
import { useCustomersContext } from '@/features/customers/context/Customers.context';

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function InvoicesSettings({}: Props) {
  const { openEditInvoiceDialog, setTitleInvoiceDialog, setIsEdit, setInvoiceToEdit } = useInvoicesContext();
  const { setIsEditCustomer } = useCustomersContext();
  const handleAddInvoice = () => {
    setInvoiceToEdit(undefined);
    setIsEdit(false);
    setIsEditCustomer(true);
    setTitleInvoiceDialog('Ingresar Facturas');
    openEditInvoiceDialog();
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Button variant="contained" size="small" color="primary" onClick={() => handleAddInvoice()} startIcon={<Add />}>
        Añadir
      </Button>
    </Box>
  );
}
