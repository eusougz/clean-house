import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { Task } from '../models/task';
import { TaskCreated } from '../models/task-created';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private appService: AppService,
    private http: HttpClient) { }

  get Tasks() {
    const userName = this.appService.UserName;
    return this.http.get<Task[]>(`${environment.api}/tasks/${userName}`);
  }

  addTask(model) {
    return this.http.post<TaskCreated>(`${environment.api}/tasks`, model);
  }

  getRecurrentTaskDay(taskId, userId) {
    return this.http.get(`${environment.api}/tasksWeek/${userId}/${taskId}`);
  }
}
