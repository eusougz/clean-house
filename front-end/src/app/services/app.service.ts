import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly api = `${environment.api}/users`;

  private logged = false;

  private users: User[];

  constructor(private http: HttpClient) {
    this.getUsers().subscribe(value => this.users = value);
  }

  private getUsers() {
    return this.http.get<User[]>(this.api);
  }

  login(userName) {
    this.users.forEach(user => {
      if (user.name === userName) {
        this.logged = true;
      }
    });

    return this.logged;
  }

  userAutheticated() {
    return this.logged;
  }

}
