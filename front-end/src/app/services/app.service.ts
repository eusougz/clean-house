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
  private userLogged: string;

  private users: User[];

  constructor(private userService: UserService){
    this.userService.getUsers().subscribe(value => this.users = value);
  }

  login(userName) {
    this.users.forEach(user => {
      if (user.name === userName) {
        this.userLogged = userName;
        this.logged = true;
      }
    });

    return this.logged;
  }

  logout() {
    this.logged = false;
  }

  userAutheticated() {
    return this.logged;
  }

  getUserName() {
    return this.userLogged;
  }

}
