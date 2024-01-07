import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient} from "@angular/common/http";
import {AUTH_API_URL} from "../_clients/web-api-client";
import {environment} from "../environments/environment";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: AUTH_API_URL, useValue: environment.authApiUrl },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService]
};
