import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useUsersContext } from "../context/users.context";

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function UserSettings({}: Props) {
  const { openEditUserDialog, setTitleUserDialog, setIsEdit, setUserToEdit } =
    useUsersContext();
  const handleAddUser = () => {
    setUserToEdit(undefined);
    setIsEdit(false);
    setTitleUserDialog("Crear usuario");
    openEditUserDialog();
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => handleAddUser()}
        startIcon={<Add />}
      >
        Añadir
      </Button>
    </Box>
  );
}
