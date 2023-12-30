import {Injectable} from '@angular/core';
import {LoginUserRequest} from "../_dtos/auth/login-user-request";
import {AcceptLanguage4, LoginUserCommand, UserClient} from "../_clients/web-api-client";

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
}
