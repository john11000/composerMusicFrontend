import { FormControl, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useFaultCausalsContext } from '../context/FaultCausals.context';
import { IFaultCausals } from '../models/FaultCausals.type';
import { FIELD_REQUIRED_MESSAGE } from '@/constants/app.constants';

type props = {
  register: UseFormRegister<IFaultCausals>;
  errors: FieldErrors<IFaultCausals>;
};

export const FaultCausalsFormEdit: React.FC<props> = ({ register, errors }) => {
  const { isEdit, faultCausalToEdit } = useFaultCausalsContext();
  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              error={!!errors.errorCode}
              defaultValue={faultCausalToEdit?.errorCode}
              helperText={errors.errorCode?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              size="small"
              label="Código de la falla."
              disabled={isEdit}
              {...register('errorCode', { required: !isEdit ? true : false })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.cause}
              defaultValue={faultCausalToEdit?.cause}
              helperText={errors.cause?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Causal de la falla."
              variant="outlined"
              size="small"
              {...register('cause', { required: true })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.description}
              defaultValue={faultCausalToEdit?.description}
              helperText={errors.description?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              size="small"
              label="Descripción de la falla."
              {...register('description', { required: true })}
            />
          </FormControl>
        </Grid>
        {isEdit && <Grid item xs={12} md={6}></Grid>}
      </Grid>
    </Container>
  );
};
