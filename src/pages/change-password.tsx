import ResetPasswordTitle from '@/features/reset-password/ResetPasswordTitle';
import { Container, Box } from '@mui/material';
import MainLayout from '@/features/commons/main-layout/MainLayout';
import ResetPasswordForm from '@/features/reset-password/ResetPasswordForm';

export default function ChangePasswordPage() {
  return (
    <MainLayout>
      <Container component="main" maxWidth="xs">
        <Box my={4}>
          <ResetPasswordTitle />
        </Box>
        <ResetPasswordForm />
      </Container>
    </MainLayout>
  );
}
