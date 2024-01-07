import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../_services/auth.service";
import {confirmPasswordValidator, passwordStrengthValidator} from "../../../_validators/password-validator";
import {NgForOf, NgIf} from "@angular/common";
import {RegisterUserCommand} from "../../../_clients/web-api-client";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.registerForm = this.fb.group({
      email: new FormControl<string>('', [Validators.email, Validators.required]),
      password: new FormControl<string>('', [Validators.required, passwordStrengthValidator()]),
      passwordConfirmation: new FormControl<string>('', [Validators.required]),
      username: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
    }, {
      validators: confirmPasswordValidator
    });
  }

  public register() {
    if (this.registerForm.invalid) return;

    const registerUserCommand = this.mapRegisterFromToRegisterUserCommand();

    this.authService.register(registerUserCommand)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
        complete: () => console.log('complete')
      });
  }

  private mapRegisterFromToRegisterUserCommand(): RegisterUserCommand {
    {
      const registerUserCommand = new RegisterUserCommand();
      registerUserCommand.email = this.registerForm.value.email;
      registerUserCommand.password = this.registerForm.value.password;
      registerUserCommand.userName = this.registerForm.value.username;

      return registerUserCommand;
    }
  }

  public isEmailAlreadyExists($event: any) {
    if(this.registerForm.get('email')?.invalid) return;

    this.authService
      .isEmailExists(this.registerForm.value.email)
      .subscribe({
        next: (response) => {
          if(response) this.registerForm.get('email')?.setErrors({emailAlreadyExists: response});
          else delete this.registerForm.get('email')?.errors?.['emailAlreadyExists'];
        }
      });
  }
}
