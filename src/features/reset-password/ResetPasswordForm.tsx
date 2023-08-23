import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ResetPasswordState } from './models/reset-password.types';
import { useState } from 'react';
import { resetPasswordService } from './services/reset-password.service';
import ToastsManager from '@/utilities/toasts.manager';

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordState>();

  const onSubmit = async (data: ResetPasswordState) => {
    setLoading(true);
    try {
      await resetPasswordService(data);
      ToastsManager.showToast('success', 'Revisa tu correo y sigue las instrucciones');
      reset();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      ToastsManager.showToast('error', err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              autoComplete="email"
              {...register('email', {
                required: { value: true, message: 'Campo requerido' },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email no válido.',
                },
              })}
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton type="submit" fullWidth variant="contained" color="primary" loading={loading}>
              <span>Enviar enlace de recuperación</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
