import { Container, Box } from "@mui/material";
import MainLayout from "@/features/commons/main-layout/MainLayout";
import {
  LoginResponse,
  RegisterFormState,
} from "@/features/login/models/login.type";
import useFetchAndLoad from "@/hooks/useFetchAndLoad";
import { doLogin } from "@/features/login/services/login.service";
import ToastsManager from "@/utilities/toasts.manager";
import { AuthSession } from "@/models";
import { setCredentials } from "@/redux/slices/auth.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ROUTER_LINK_DASHBOARD } from "@/constants/routes-link.constants";
import { AxiosError, isAxiosError } from "axios";
import RegisterForm from "@/features/register/components/RegisterForm";
import RegisterFormHeader from "@/features/register/components/RegisterFormHeader";
import { doRegister } from "@/features/login/services/register.service";

export default function RegisterPage() {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatcher = useDispatch();
  const router = useRouter();

  const setSesion = (newSession: LoginResponse) => {
    const newCredentials: AuthSession = {
      accessToken: newSession.accessToken,
      user: {
        email: newSession.email,
        role: newSession.role,
      },
    };

    dispatcher(setCredentials(newCredentials));
    router.push(ROUTER_LINK_DASHBOARD);
  };

  const onSubmit = async (data: RegisterFormState) => {
    try {
      const response = await callEndpoint<LoginResponse>(doRegister(data));

      setSesion(response.data);
    } catch (error: any) {
      if (isAxiosError(error)) {
        const err = error as AxiosError<{ message: string }>;

        if (err.response) {
          if (err.response.status === 400) {
            ToastsManager.showToast("error", err.response.data.message);
          } else {
            ToastsManager.showToast(
              "error",
              "Ocurrió un error, contacte con soporte"
            );
          }
        } else if (err.request) {
          ToastsManager.showToast(
            "error",
            "Error al conectar con el servidor."
          );
        } else {
          ToastsManager.showToast("error", err.message);
        }
      } else {
        ToastsManager.showToast("error", error?.message);
      }
    }
  };

  return (
    <MainLayout>
      <Container component="main" maxWidth="xs">
        <Box my={4}>
          <RegisterFormHeader />
        </Box>
        <RegisterForm onSubmit={onSubmit} loading={loading} />
      </Container>
    </MainLayout>
  );
}
