import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useDistributorsContext } from '../context/Distributors.context';
import { IDistributors } from '../models/Distributors.type';
import { FIELD_EMAIL_MESSAGE, FIELD_REQUIRED_MESSAGE } from '@/constants/app.constants';

type props = {
  register: UseFormRegister<IDistributors>;
  errors: FieldErrors<IDistributors>;
};

export const DistributorsFormEdit: React.FC<props> = ({ register, errors }) => {
  const { isEdit, distributorToEdit } = useDistributorsContext();
  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.name}
              defaultValue={distributorToEdit?.name}
              helperText={errors.name?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              size="small"
              label="Razón social"
              {...register('name', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              type="number"
              error={!!errors.documentNumber}
              defaultValue={distributorToEdit?.documentNumber}
              label="Número de Documento"
              variant="outlined"
              size="small"
              {...register('documentNumber')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              error={!!errors.nameOfPersonInCharge}
              defaultValue={distributorToEdit?.nameOfPersonInCharge}
              label="Nombres del Responsable"
              variant="outlined"
              size="small"
              {...register('nameOfPersonInCharge')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              error={!!errors.lastNameOfPersonInCharge}
              defaultValue={distributorToEdit?.lastNameOfPersonInCharge}
              label="Apellidos del responsable"
              variant="outlined"
              size="small"
              {...register('lastNameOfPersonInCharge')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              type="email"
              error={!!errors.email}
              defaultValue={distributorToEdit?.email}
              label="Correo electrónico"
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
              error={!!errors.phoneNumber}
              defaultValue={distributorToEdit?.phoneNumber}
              label="Número teléfonico"
              variant="outlined"
              size="small"
              {...register('phoneNumber', {
                // pattern: {
                //   value: /^\d{10}$/,
                //   message: 'El número telefónico debe tener 10 dígitos.',
                // },
              })}
            />
            {errors.phoneNumber && <FormHelperText error>{errors.phoneNumber.message}</FormHelperText>}
          </FormControl>
        </Grid>
        {isEdit && <Grid item xs={12} md={6}></Grid>}
      </Grid>
    </Container>
  );
};
