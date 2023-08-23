import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useReferencesContext } from '../context/References.context';

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function ReferencesSettings({}: Props) {
  const { openEditReferenceDialog, setTitleReferenceDialog, setIsEdit, setReferenceToEdit } = useReferencesContext();

  const handleAddReference = () => {
    setReferenceToEdit(undefined);
    setIsEdit(false);
    setTitleReferenceDialog('Crear referencia');
    openEditReferenceDialog();
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Button variant="contained" size="small" color="primary" onClick={() => handleAddReference()} startIcon={<Add />}>
        Añadir
      </Button>
    </Box>
  );
}
