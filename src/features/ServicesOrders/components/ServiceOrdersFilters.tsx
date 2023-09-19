import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import ToastsManager from "@/utilities/toasts.manager";
import useFilterServiceOrders from "../hooks/useFilterServiceOrders";
import {
  IFiltersFormState,
  ServicesOrderStateEnum,
} from "../models/ServiceOrders.type";
import { useForm } from "react-hook-form";
import { FIELD_REQUIRED_MESSAGE } from "@/constants/app.constants";
type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function ServiceOrdersFilters({}: Props) {
  const { findServiceOrders: findServiceOrdersFromApi, loading } =
    useFilterServiceOrders();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFiltersFormState>();
  const onSubmit = async (data: IFiltersFormState) => {
    if (data) {
      const res = await findServiceOrdersFromApi(data);
      if (res.data) {
      } else {
        ToastsManager.showToast(
          "error",
          "No se ha encontrado Ordenes de servicio con los filtros seleccionados"
        );
      }
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
        <Grid container spacing={1} display="flex" justifyContent="flex-end">
          <Grid item xs={12} sm={3}>
            <TextField
              label="Buscar por NIT"
              fullWidth
              variant="outlined"
              size="small"
              style={{
                background: "white",
                backgroundSize: "cover",
              }}
              {...register("identificationNumber")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Buscar por descripción de referencia"
              fullWidth
              variant="outlined"
              size="small"
              style={{
                background: "white",
                backgroundSize: "cover",
              }}
              {...register("address")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Buscar por barrio"
              fullWidth
              variant="outlined"
              size="small"
              style={{
                background: "white",
                backgroundSize: "cover",
              }}
              {...register("referenceDescription")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="state-select-label">Buscar por Estado</InputLabel>
              <Select
                labelId="state-select-label"
                id="state-simple-select"
                label="Buscar por Estado"
                {...register("state", { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.state}
                style={{
                  background: "white",
                  backgroundSize: "cover",
                }}
                size="small"
              >
                <MenuItem value={ServicesOrderStateEnum.TODAS}>
                  {ServicesOrderStateEnum.TODAS}
                </MenuItem>
                <MenuItem value={ServicesOrderStateEnum.ABIERTAS}>
                  {ServicesOrderStateEnum.ABIERTAS}
                </MenuItem>
                <MenuItem value={ServicesOrderStateEnum.ASIGNADAS}>
                  {ServicesOrderStateEnum.ASIGNADAS}
                </MenuItem>
                <MenuItem value={ServicesOrderStateEnum.BLOQUEADAS}>
                  {ServicesOrderStateEnum.BLOQUEADAS}
                </MenuItem>
                <MenuItem value={ServicesOrderStateEnum.CERRADAS}>
                  {ServicesOrderStateEnum.CERRADAS}
                </MenuItem>
                <MenuItem value={ServicesOrderStateEnum.ANULADAS}>
                  {ServicesOrderStateEnum.ANULADAS}
                </MenuItem>
              </Select>
              <FormHelperText error={!!errors.state}>
                {errors.state?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <LoadingButton
              variant="contained"
              fullWidth
              endIcon={<Search></Search>}
              size="medium"
              type="submit"
              loading={loading}
            >
              Aplicar filtro
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
