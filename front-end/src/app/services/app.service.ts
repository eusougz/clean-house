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

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.api);
  }

}
