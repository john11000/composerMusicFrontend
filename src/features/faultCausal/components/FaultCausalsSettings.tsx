import { Add } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useFaultCausalsContext } from "../context/FaultCausals.context";

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function FaultCausalsSettings({}: Props) {
  const {
    openEditFaultCausalDialog,
    setTitleFaultCausalDialog,
    setIsEdit,
    setFaultCausalToEdit,
  } = useFaultCausalsContext();

  const HandleClickButton = () => {
    setFaultCausalToEdit(undefined);
    setIsEdit(false);
    setTitleFaultCausalDialog("Crear Fallas y causales");
    openEditFaultCausalDialog();
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Tooltip title="Crear fallas y causales">
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
