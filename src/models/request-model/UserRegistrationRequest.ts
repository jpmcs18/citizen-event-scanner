export default interface UserRegistrationRequest {
  username: string;
  isUsernameError?: boolean;
  usernameErrorMessage?: string;

  email: string;
  isEmailError?: boolean;
  emailErrorMessage?: string;

  mobileNumber: string;
  password: string;
  confirmPassword: string;
}
