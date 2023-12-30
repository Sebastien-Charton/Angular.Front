import { Component } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../_services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  public login() {

    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value)
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

    console.log('login');
  }
}
