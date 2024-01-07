import {Component} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../_services/auth.service";
import {Router, RouterLink, RouterModule} from "@angular/router";
import {passwordStrengthValidator} from "../../../_validators/password-validator";
import {LoginUserCommand} from "../../../_clients/web-api-client";
import {routesNames} from "../../app.routes";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup;
  public errorMessage: string = '';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, passwordStrengthValidator()]]
    });
  }

  public login() {
    if (this.loginForm.invalid) return;

    const loginUserCommand = this.mapLoginFromToLoginUserCommand();

    this.authService.login(loginUserCommand)
      .subscribe({
        next: () => this.successfulLogin(),
        error: (error) => this.handleError(error),
        complete: () => console.log('complete')
      });
  }

  public successfulLogin() {
    this.router
      .navigate([routesNames.message]);
  }

  private mapLoginFromToLoginUserCommand(): LoginUserCommand {
    const loginUserCommand = new LoginUserCommand();
    loginUserCommand.email = this.loginForm.value.email;
    loginUserCommand.password = this.loginForm.value.password;

    return loginUserCommand;
  }

  private handleError(error: any) {
    if(error.status === 401)
      this.errorMessage = 'Invalid username or password';
    else
      this.errorMessage = 'An error occurred while trying to login. Please try again later.';
  }

  protected readonly routesNames = routesNames;
}
