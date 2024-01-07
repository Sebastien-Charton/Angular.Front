import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AUTH_API_URL} from "../_clients/web-api-client";
import {environment} from "../environments/environment";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {authInterceptor} from "../_interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    { provide: AUTH_API_URL, useValue: environment.authApiUrl },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService]
};
