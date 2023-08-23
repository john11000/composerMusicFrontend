import Logo1 from '@/features/commons/Logo1';
import { Typography } from '@mui/material';

export default function LoginFormHeader() {
  return (
    <>
      <Logo1 />
      <Typography component="h2" variant="h5" align="center">
        Inicia sesión para continuar
      </Typography>
    </>
  );
}
