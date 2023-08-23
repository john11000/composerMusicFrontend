import { Typography } from '@mui/material';
import Logo1 from '../commons/Logo1';

export default function ResetPasswordTitle() {
  return (
    <>
      <Logo1 />
      <Typography component="h2" variant="h5" align="center">
        Aquí puedes recuperar tu contraseña.
      </Typography>
      <Typography sx={{ mt: 2 }}>Enviaremos un email con un link que te permitirá restablecer tu contraseña</Typography>
    </>
  );
}
