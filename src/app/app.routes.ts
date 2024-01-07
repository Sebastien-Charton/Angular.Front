import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {MessageComponent} from "./pages/message/message.component";

export const routesNames = {
  login: '',
  register: 'register',
  message: 'message'
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
    title: 'Message'
  }
];
