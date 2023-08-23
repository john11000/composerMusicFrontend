import { FIELD_REQUIRED_MESSAGE } from '@/constants/app.constants';
import { IUser } from '@/features/users/models/users.type';
import { Grid, Container, TextField, Autocomplete } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type props = {
  users: IUser[];
};
export const ServiceOrdersAsignTecnicForm = ({ users }: props) => {
  const { control } = useForm();
  return (
    <Container>
      <Grid container spacing={2} sx={{ marginTop: '25px' }}>
        <Grid item xs={6} sx={{ marginX: 'auto' }}>
          <Controller
            name="drpSelectCustomer"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                fullWidth
                options={users
                  .filter((tecnic) => tecnic.roleId === 3)
                  .map((tecnic: IUser, index: number) => {
                    return {
                      id: index,
                      value: tecnic.id.toString(),
                      label: tecnic?.identificationNumber?.toString() + ' - ' + tecnic?.firstName,
                    };
                  })}
                onChange={(_, newValue) => {
                  onChange(newValue);
                }}
                value={value || null}
                size="small"
                renderInput={(params) => (
                  <TextField
                    error={Boolean(error?.message)}
                    variant="outlined"
                    helperText={error?.message}
                    {...params}
                    label="Asignar técnico"
                    size="small"
                  />
                )}
              />
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
