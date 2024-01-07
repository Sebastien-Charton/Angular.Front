import { Component } from '@angular/core';
import {TokenService} from "../../../_services/token.service";
import {AuthService} from "../../../_services/auth.service";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  public token: string | null = null;
  constructor(tokenService: TokenService, private authService: AuthService) {
    this.token = tokenService.getToken()
    console.log(tokenService.decodeToken())
    console.log(tokenService.getUserName())
    console.log(tokenService.getRoles())
    console.log(tokenService.getEmail())
    console.log(tokenService.getUserId())

    this.authService.isEmailConfirmed().subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }

}
