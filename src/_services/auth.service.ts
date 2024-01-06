import {Injectable} from '@angular/core';
import {LoginUserRequest} from "../_dtos/auth/login-user-request";
import {
  AcceptLanguage2,
  AcceptLanguage4,
  LoginUserCommand,
  RegisterUserCommand,
  UserClient
} from "../_clients/web-api-client";
import {RegisterComponent} from "../app/pages/register/register.component";
import {RegisterUserRequest} from "../_dtos/auth/register-user-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authClient: UserClient) { }

  public login(model: LoginUserRequest){

    const loginUserCommand = new LoginUserCommand();
    loginUserCommand.email = model.email;
    loginUserCommand.password = model.password;

    return this.authClient.loginUser(AcceptLanguage4.EnUS, loginUserCommand);
  }

  public register(model: RegisterUserRequest){

    const registerUserCommand = new RegisterUserCommand();
    registerUserCommand.email = model.email;
    registerUserCommand.password = model.password;
    registerUserCommand.userName = model.username;

    return this.authClient.registerUser(AcceptLanguage2.EnUS, registerUserCommand);

  }
}
