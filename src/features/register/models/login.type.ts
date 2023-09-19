export interface LoginFormState {
  email: string;
  password: string;
}

export interface LoginResponse {
  firstName: string;
  lastName: string;
  accessToken: string;
  role: string;
  email: string;
}
