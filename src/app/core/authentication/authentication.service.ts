import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }


  async login(credentials: { password: string; email: string }) {
    // TODO: Implement login
  }
}
