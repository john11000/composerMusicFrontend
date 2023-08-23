import { Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Search } from '@mui/icons-material';
import { IFiltersFormStateInvoices, Iinvoices } from '../models/Invoices.type';
import useFilterInvoices from '../hooks/useFilterInvoices';
import { LoadingButton } from '@mui/lab';
import ToastsManager from '@/utilities/toasts.manager';
import { useForm } from 'react-hook-form';
type Props = {
  setInvoices: React.Dispatch<React.SetStateAction<Iinvoices[]>>;
  getInvoices: () => void;
};

export default function InvoicesFilters({ setInvoices, getInvoices }: Props) {
  const { findInvoices: findInvoicesFromApi, loading } = useFilterInvoices();

  const { register, handleSubmit, reset } = useForm<IFiltersFormStateInvoices>();
  const onSubmit = async (data: IFiltersFormStateInvoices) => {
    if (data) {
      if (data.identificationNumber || data.referenceDescription || (data.address && data.address !== '')) {
        const res = await findInvoicesFromApi(data);
        if (res.data) {
          setInvoices(res.data);
          ToastsManager.showToast('success', 'Filtros aplicados correctamente');
          return;
        } else {
          ToastsManager.showToast('error', 'No se ha encontrado facturas con los filtros seleccionados');
          return;
        }
      }
      getInvoices();
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Buscar por NIT"
              fullWidth
              variant="outlined"
              size="small"
              style={{
                background: 'white',
                backgroundSize: 'cover',
              }}
              {...register('identificationNumber')}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Buscar por descripción de referencia"
              fullWidth
              variant="outlined"
              size="small"
              style={{
                background: 'white',
                backgroundSize: 'cover',
              }}
              {...register('referenceDescription')}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Buscar por dirección"
              fullWidth
              variant="outlined"
              size="small"
              style={{
                background: 'white',
                backgroundSize: 'cover',
              }}
              {...register('address')}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <LoadingButton
              variant="contained"
              fullWidth
              endIcon={<Search></Search>}
              size="medium"
              type="submit"
              loading={loading}
            >
              Aplicar filtros
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
