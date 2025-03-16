enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned,
}
enum TokenType {
  AccessToken,
  RefreshToken,
  EmailVerifyToken,
  PasswordResetToken,
  ForgotPasswordToken,
}
export { UserVerifyStatus, TokenType };
