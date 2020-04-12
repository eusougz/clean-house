import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private logged = false;

  private users: User[];

  private USER_KEY = 'user';

  constructor(
    private userService: UserService) {
    this.userService.getUsers().subscribe(value => this.users = value);

    if (this.UserName) {
      this.logged = true;
    }
  }

  userAutheticated() {
    return this.logged;
  }

  login(userName) {
    this.users.forEach(user => {
      if (user.name === userName) {
        localStorage.setItem(this.USER_KEY, userName);
        this.logged = true;
      }
    });

    return this.logged;
  }

  logout() {
    localStorage.clear();
    this.logged = false;
  }

  get UserName() {
    return localStorage.getItem(this.USER_KEY) || false;
  }

}
