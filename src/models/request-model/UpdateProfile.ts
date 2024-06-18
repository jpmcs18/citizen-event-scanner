export default interface UpdateUserProfile {
  username: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
