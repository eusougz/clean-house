import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { SuccessfullyCreated } from '../models/successfully-created';
import { TaskView } from '../models/task-view';
import { TasksWeek } from '../models/tasks-week';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private appService: AppService,
    private http: HttpClient) { }

  get DayTasks() {
    const userName = this.appService.UserName;
    return this.http.get<TaskView[]>(`${environment.api}/tasks/${userName}`);
  }

  get AllTasks() {
    const userName = this.appService.UserName;
    return this.http.get<TasksWeek[]>(`${environment.api}/allTasks/${userName}`);
  }

  edit(model) {
    return this.http.post(`${environment.api}/editTask`, model);
  }

  completeTask(taskId, date) {
    const model = {
      task_id: taskId,
      date
    };
    return this.http.post<SuccessfullyCreated>(`${environment.api}/completedTasks`, model);
  }

  addTask(model) {
    return this.http.post<SuccessfullyCreated>(`${environment.api}/tasks`, model);
  }

}
