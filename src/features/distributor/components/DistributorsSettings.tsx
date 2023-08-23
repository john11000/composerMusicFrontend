import { Add } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import { useDistributorsContext } from '../context/Distributors.context';

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function DistributorsSettings({}: Props) {
  const { openEditDistributorDialog, setTitleDistributorDialog, setIsEdit, setDistributorToEdit } =
    useDistributorsContext();

  const HandleClickButton = () => {
    setDistributorToEdit(undefined);
    setIsEdit(false);
    setTitleDistributorDialog('Crear Distribuidores');
    openEditDistributorDialog();
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Tooltip title="Crear Distribuidor">
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => HandleClickButton()}
          startIcon={<Add />}
        >
          Añadir
        </Button>
      </Tooltip>
    </Box>
  );
}
