import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { ChangePasswordState } from "./models/change-password.type";
import { changePasswordService } from "./services/change-password.service";
import { useRouter } from "next/router";
import ToastsManager from "@/utilities/toasts.manager";
import { ROUTE_LINK_LOGIN } from "@/constants/routes-link.constants";
import { FIELD_REQUIRED_MESSAGE } from "@/constants/app.constants";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const token = router.query.token as string;
  const userId = router.query.id as string;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordState>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (data: ChangePasswordState) => {
    setLoading(true);
    if (!token) {
      ToastsManager.showToast("error", "Link no valido, el token ha expirado.");
      return;
    }
    try {
      await changePasswordService({ userId, token, password: data.password });
      ToastsManager.showToast(
        "success",
        "Constraseña actualizada correctamente."
      );
      router.push(ROUTE_LINK_LOGIN);
    } catch (error) {
      const err = error as any;
      ToastsManager.showToast("error", err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      {!token ? (
        <Typography component="h2" variant="h5" align="center">
          Token no valido.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                error={Boolean(errors.password?.message)}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña"
                  {...register("password", {
                    required: { value: true, message: FIELD_REQUIRED_MESSAGE },
                    minLength: {
                      value: 6,
                      message:
                        "La contraseña debe tener al menos 6 caracteres.",
                    },
                  })}
                />
                <FormHelperText error>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirmar contraseña"
                type="password"
                autoComplete="confirm-password"
                {...register("confirmPassword", {
                  required: { value: true, message: FIELD_REQUIRED_MESSAGE },
                  validate: (value) =>
                    value === getValues("password") ||
                    "La contraseña no coincide.",
                })}
                error={Boolean(errors.confirmPassword?.message)}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                loading={loading}
              >
                <span>Cambiar contraseña</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}
