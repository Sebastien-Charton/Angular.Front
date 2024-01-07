import {Injectable} from '@angular/core';
import {
  AcceptLanguage15,
  AcceptLanguage16,
  AcceptLanguage2,
  AcceptLanguage4,
  LoginUserCommand, LoginUserResponse,
  RegisterUserCommand,
  UserClient
} from "../_clients/web-api-client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authClient: UserClient) {
  }

  public login(loginUserCommand: LoginUserCommand): Observable<LoginUserResponse> {
    return this.authClient.loginUser(AcceptLanguage4.EnUS, loginUserCommand);
  }

  public register(registerUserCommand: RegisterUserCommand): Observable<string> {
    return this.authClient.registerUser(AcceptLanguage2.EnUS, registerUserCommand);
  }

  public isUserNameExists(userName: string): Observable<boolean> {
    return this.authClient.isUserNameExists(userName, AcceptLanguage16.EnUS);
  }

  public isEmailExists(email: string): Observable<boolean> {
    return this.authClient.isEmailExists(email, AcceptLanguage15.EnUS);
  }
}
