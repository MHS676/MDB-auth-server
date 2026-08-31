export class LoginDto {
  email: string;
  password?: string;
  secretPass?: string;
}

export class RegisterDto {
  email: string;
  name: string;
  password: string;
}

export class RefreshTokenDto {
  refresh_token: string;
}
