import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../_services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      username: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  public register() {
    this.authService.register(this.registerForm.value)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        },
        () => {
          console.log('complete');
        }
      );
  }
}
