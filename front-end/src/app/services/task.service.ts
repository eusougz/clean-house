import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private appService: AppService,
    private http: HttpClient) { }

  getTasks() {
    const userName = this.appService.UserName;
    return this.http.get<Task[]>(`${environment.api}/tasks/${userName}`);
  }
}
