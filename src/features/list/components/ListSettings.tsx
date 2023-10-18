import { ROUTER_MODULE_GENERATE_MELODY } from "@/constants/routes-link.constants";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function ListsSettings({}: Props) {
  const router = useRouter();

  const handleAddList = () => {
    router.push(ROUTER_MODULE_GENERATE_MELODY);
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => handleAddList()}
        startIcon={<Add />}
      >
        Añadir
      </Button>
    </Box>
  );
}
