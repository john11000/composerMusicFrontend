import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useServicesContext } from '../context/Services.context';

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function ServicesSettings({}: Props) {
  const { openEditServiceDialog, setTitleServiceDialog, setIsEdit, setServiceToEdit } = useServicesContext();
  const handleAddService = () => {
    setServiceToEdit(undefined);
    setIsEdit(false);
    setTitleServiceDialog('Crear Servicio');
    openEditServiceDialog();
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Button variant="contained" size="small" color="primary" onClick={() => handleAddService()} startIcon={<Add />}>
        Añadir
      </Button>
    </Box>
  );
}
