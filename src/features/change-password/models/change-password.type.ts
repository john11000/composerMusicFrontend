export interface ChangePasswordState {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  userId?: string;
  password: string;
  token: string;
}
