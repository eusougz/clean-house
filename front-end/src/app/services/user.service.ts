import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${environment.api}/users`);
  }

  newUser(name) {
    const model = {
      name
    };
    return this.http.post(`${environment.api}/users`, model);
  }
}
