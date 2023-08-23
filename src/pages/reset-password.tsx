import ChangePasswordForm from '@/features/change-password/ChangePasswordForm';
import ChangePasswordTitle from '@/features/change-password/ChangePasswordTitle';
import MainLayout from '@/features/commons/main-layout/MainLayout';
import { Container, Box } from '@mui/material';

export default function ResetPasswordPage() {
  return (
    <MainLayout>
      <Container component="main" maxWidth="xs">
        <Box my={4}>
          <ChangePasswordTitle />
        </Box>
        <ChangePasswordForm />
      </Container>
    </MainLayout>
  );
}
