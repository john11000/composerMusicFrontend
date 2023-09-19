import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useServiceOrdersContext } from "../context/ServiceOrders.context";

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function ServiceOrdersSettings({}: Props) {
  const {
    openEditServiceOrderDialog,
    setTitleServiceOrderDialog,
    setIsEdit,
    setServiceOrderToEdit,
  } = useServiceOrdersContext();
  const handleAddServiceOrder = () => {
    setServiceOrderToEdit(undefined);
    setIsEdit(false);
    setTitleServiceOrderDialog("Crear orden de servicio");
    openEditServiceOrderDialog();
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => handleAddServiceOrder()}
        startIcon={<Add />}
      >
        Añadir
      </Button>
    </Box>
  );
}
