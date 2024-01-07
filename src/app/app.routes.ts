import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {MessageComponent} from "./pages/message/message.component";
import {authGuard} from "../_guards/auth.guard";
import {TestPageComponent} from "./pages/test-page/test-page.component";

export const routesNames = {
  login: '',
  register: 'register',
  message: 'message',
  testPage: 'test-page'
}

export const routes: Routes = [
  {
    path: routesNames.login,
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: routesNames.register,
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: routesNames.message,
    component: MessageComponent,
    title: 'Message',
    canActivate: [authGuard]
  },
  {
    path: routesNames.testPage,
    component: TestPageComponent,
    title: 'Test Page'
  }
];
