import {Injectable} from '@angular/core';
import {
  AcceptLanguage12,
  AcceptLanguage15,
  AcceptLanguage16,
  AcceptLanguage2,
  AcceptLanguage4,
  LoginUserCommand, LoginUserResponse,
  RegisterUserCommand,
  UserClient
} from "../_clients/web-api-client";
import {map, Observable} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly authClient: UserClient,
              private readonly tokenService: TokenService) {
  }

  public login(loginUserCommand: LoginUserCommand)  : Observable<void>{
    return this.authClient
      .loginUser(AcceptLanguage4.EnUS, loginUserCommand)
      .pipe(
        map((response: LoginUserResponse) => {
          const token= response.token;

          if (token != null) {
            this.tokenService.setToken(token);
          }
        })
      );
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

  public isEmailConfirmed(): Observable<boolean> {
    return this.authClient.isEmailConfirmed(AcceptLanguage12.EnUS);
  }
}
