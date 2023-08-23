import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useUsersContext } from '../context/users.context';
import { IUser } from '../models/users.type';
import { FIELD_EMAIL_MESSAGE, FIELD_REQUIRED_MESSAGE } from '@/constants/app.constants';
import { RolesEnum } from '@/models/roles.enum';
import useGetRol from '@/hooks/useGetRol';

type props = {
  register: UseFormRegister<IUser>;
  errors: FieldErrors<IUser>;
};

export const UserFormEdit: React.FC<props> = ({ register, errors }) => {
  const { isEdit, userToEdit } = useUsersContext();
  const role = useGetRol();

  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto">
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.firstName}
              defaultValue={userToEdit?.firstName}
              helperText={errors.firstName?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              size="small"
              label="Nombres"
              {...register('firstName', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.lastName}
              defaultValue={userToEdit?.lastName}
              helperText={errors.lastName?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Apellidos"
              variant="outlined"
              size="small"
              {...register('lastName', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.identificationNumber}
              defaultValue={userToEdit?.identificationNumber}
              helperText={errors.identificationNumber?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              size="small"
              label="Número de documento"
              {...register('identificationNumber', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.location}
              defaultValue={userToEdit?.location}
              helperText={errors.location?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              size="small"
              label="Ubicación"
              {...register('location', { required: true })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            error={!!errors.email}
            defaultValue={userToEdit?.email}
            helperText={errors.email?.message}
            variant="outlined"
            size="small"
            label="Correo electrónico"
            {...register('email', {
              required: { value: true, message: FIELD_REQUIRED_MESSAGE },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: FIELD_EMAIL_MESSAGE,
              },
            })}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth error={!!errors.roleId} size="small">
            <InputLabel id="select-label">Perfil</InputLabel>
            {role === RolesEnum.ADMINSTRADOR ? (
              <Select
                label="Perfil"
                labelId="select-label"
                required
                error={!!errors.roleId}
                defaultValue={userToEdit?.roleId}
                {...register('roleId', { required: true })}
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Auxiliar</MenuItem>
                <MenuItem value={3}>Tecnico</MenuItem>
                <MenuItem value={4}>Cliente</MenuItem>
              </Select>
            ) : (
              <Select
                label="Perfil"
                labelId="select-label"
                required
                error={!!errors.roleId}
                defaultValue={userToEdit?.roleId}
                {...register('roleId', { required: true })}
              >
                <MenuItem value={3}>Tecnico</MenuItem>
                <MenuItem value={4}>Cliente</MenuItem>
              </Select>
            )}

            {errors.roleId?.type === 'required' && <FormHelperText>Campo requerido</FormHelperText>}
          </FormControl>
        </Grid>

        {isEdit && (
          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors.isActive} size="small">
              <InputLabel>Estado</InputLabel>
              <Select
                label="Estado"
                required
                error={!!errors.isActive}
                defaultValue={userToEdit?.isActive ? 1 : 0}
                {...register('isActive', { required: true })}
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={0}>Inactivo</MenuItem>
              </Select>
              {errors.isActive?.type === 'required' && <FormHelperText>Campo requerido</FormHelperText>}
            </FormControl>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
