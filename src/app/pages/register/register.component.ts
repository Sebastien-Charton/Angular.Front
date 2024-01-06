import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../_services/auth.service";
import {confirmPasswordValidator, passwordStrengthValidator} from "../../../_validators/password-validator";
import {NgForOf, NgIf} from "@angular/common";

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
    }, { validators: confirmPasswordValidator
    });
  }

  public register() {
    this.authService.register(this.registerForm.value)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
        complete: () => console.log('complete')
      });
  }
}
