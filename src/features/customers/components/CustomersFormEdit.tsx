import { Autocomplete, AutocompleteRenderInputParams, FormControl, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useCustomersContext } from '../context/Customers.context';
import { City, ICustomers, IDepartments } from '../models/Customers.type';
import { FIELD_EMAIL_MESSAGE, FIELD_REQUIRED_MESSAGE, FIELD_TELEFONO_MESSAGE } from '@/constants/app.constants';

type Props = {
  register: UseFormRegister<ICustomers>;
  errors: FieldErrors<ICustomers>;
  watch: UseFormWatch<ICustomers>;
  control: Control<ICustomers>;
  departaments: IDepartments[];
  setValue: UseFormSetValue<ICustomers>;
};

const CustomersFormEdit: React.FC<Props> = ({ register, errors, watch, control, departaments, setValue }) => {
  const { isEdit, customerToEdit } = useCustomersContext();
  const watchDepartament = watch('departamentDrp');
  const watchCityDrp = watch('cityDrp');

  useEffect(() => {
    if (customerToEdit?.departamentDrp && customerToEdit?.cityDrp) {
      setValue('cityDrp', customerToEdit.cityDrp);
      setValue('departamentDrp', customerToEdit.departamentDrp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerToEdit]);

  useEffect(() => {
    if (
      watchDepartament === null ||
      (watchDepartament && watchCityDrp && watchDepartament?.value !== watchCityDrp?.departmentId)
    ) {
      setValue('cityDrp', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDepartament, watchCityDrp]);

  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              type="number"
              error={!!errors.identificationNumber}
              defaultValue={customerToEdit?.identificationNumber}
              helperText={errors.identificationNumber?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              label="NIT"
              size="small"
              {...register('identificationNumber', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              type="email"
              error={!!errors.email}
              defaultValue={customerToEdit?.email}
              helperText={errors.email?.message}
              label="Correo"
              variant="outlined"
              size="small"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: FIELD_EMAIL_MESSAGE,
                },
              })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.firstName}
              defaultValue={customerToEdit?.firstName}
              helperText={errors.firstName?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              label="Nombres"
              size="small"
              {...register('firstName', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.lastName}
              defaultValue={customerToEdit?.lastName}
              helperText={errors.lastName?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              label="Apellidos"
              size="small"
              {...register('lastName', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="departamentDrp"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                fullWidth
                sx={{ position: 'relative', zIndex: 2 }}
                defaultValue={customerToEdit?.departamentDrp}
                options={departaments.map((depart: IDepartments, index: number) => ({
                  id: index,
                  value: depart.id,
                  label: depart.name,
                }))}
                onChange={(_, newValue) => {
                  onChange(newValue);
                }}
                value={value || null}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <TextField
                    error={Boolean(error?.message)}
                    variant="outlined"
                    helperText={error?.message}
                    {...params}
                    size="small"
                    label="Departamento *"
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="cityDrp"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                fullWidth
                sx={{ position: 'relative', zIndex: 2 }}
                defaultValue={customerToEdit?.cityDrp}
                options={(departaments[watchDepartament?.id || 0]?.cities || []).map((city: City) => ({
                  id: city.id,
                  value: city.codeCity,
                  label: city.name,
                  departmentId: city.departmentId,
                }))}
                onChange={(_, newValue) => {
                  onChange(newValue);
                }}
                value={value || null}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <TextField
                    error={Boolean(error?.message)}
                    variant="outlined"
                    helperText={error?.message}
                    {...params}
                    size="small"
                    label="Ciudad *"
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.address}
              defaultValue={customerToEdit?.address}
              helperText={errors.address?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Dirección"
              variant="outlined"
              size="small"
              {...register('address', { required: true })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.neighborhood}
              defaultValue={customerToEdit?.neighborhood}
              helperText={errors.neighborhood?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Barrio"
              variant="outlined"
              size="small"
              {...register('neighborhood', { required: true })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              error={!!errors.addressDescription}
              defaultValue={customerToEdit?.addressDescription}
              helperText={errors.addressDescription?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Guía-Ubicación"
              variant="outlined"
              size="small"
              {...register('addressDescription')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.phone}
              defaultValue={customerToEdit?.phone}
              helperText={errors.phone?.message}
              label="Teléfono principal"
              variant="outlined"
              size="small"
              {...register('phone', {
                required: true,
                pattern: {
                  value: /^[0-9+]+$/i,
                  message: FIELD_TELEFONO_MESSAGE,
                },
              })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              error={!!errors.optionalPhone}
              defaultValue={customerToEdit?.optionalPhone}
              helperText={errors.optionalPhone?.message}
              label="Teléfono opcional"
              variant="outlined"
              size="small"
              {...register('optionalPhone', {
                pattern: {
                  value: /^[0-9+]+$/,
                  message: FIELD_TELEFONO_MESSAGE,
                },
              })}
            />
          </FormControl>
        </Grid>

        {isEdit && <Grid item xs={12} md={6}></Grid>}
      </Grid>
    </Container>
  );
};

export default CustomersFormEdit;
