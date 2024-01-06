export class RegisterUserRequest {
  constructor(
    public email: string,
    public password: string,
    public username: string
  ) { }
}
