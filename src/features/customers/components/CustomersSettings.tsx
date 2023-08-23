import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useCustomersContext } from '../context/Customers.context';

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
export default function CustomersSettings({}: Props) {
  const { openEditCustomerDialog, setTitleCustomerDialog, setIsEdit, setCustomerToEdit } = useCustomersContext();

  const handleAddCustomer = () => {
    setCustomerToEdit(undefined);
    setIsEdit(false);
    setTitleCustomerDialog('Crear Cliente');
    openEditCustomerDialog();
  };

  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Button variant="contained" size="small" color="primary" onClick={handleAddCustomer} startIcon={<Add />}>
        Añadir
      </Button>
    </Box>
  );
}
