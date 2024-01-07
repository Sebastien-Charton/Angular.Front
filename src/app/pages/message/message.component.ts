import { Component } from '@angular/core';
import {TokenService} from "../../../_services/token.service";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  public token: string | null = null;
  constructor(tokenService: TokenService) {
    this.token = tokenService.getToken()
    console.log(tokenService.decodeToken())
    console.log(tokenService.getUserName())
    console.log(tokenService.getRoles())
    console.log(tokenService.getEmail())
    console.log(tokenService.getUserId())
  }

}
