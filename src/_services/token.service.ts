import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'access_token';

  constructor(public jwtHelper: JwtHelperService) {}

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public isTokenExpired(token?: string | null): boolean {
    if (!token) token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  public decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
  }

  public getRoles(): string[] {
    const decodedToken = this.decodeToken();

    return  decodedToken.role;
  }

  public getEmail(): string {
    const decodedToken = this.decodeToken();

    return  decodedToken.email;
  }

  public getUserName(): string {
    const decodedToken = this.decodeToken();

    return  decodedToken.family_name;
  }

  public getUserId(): string {
    const decodedToken = this.decodeToken();

    return  decodedToken.nameid;
  }
}
