import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { Task } from '../models/task';
import { TaskCreated } from '../models/task-created';
import { TaskDay } from '../models/task-day';

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
    return this.http.get<TaskDay>(`${environment.api}/tasksWeek/${userId}/${taskId}`);
  }

  todayTasks(tasks: Task[], userId) {
    let todayTasks: Task[] = [];
    const today: Date = new Date();

    tasks.forEach(task => {
      if (task.recurrent) {
        this.getRecurrentTaskDay(task.id, userId).subscribe(taskDay => {
          if (this.checkDayIsToday(today, parseInt(taskDay.day, 10))) {
            todayTasks.push(task);
          }
        });
      } else {
        if (this.checkDateIsCurrent(today, new Date(task.date))) {
          todayTasks.push(task);
        }
      }
    });

    console.log(todayTasks);

    return todayTasks;
  }

  checkDayIsToday(today, taskDay) {
    return today.getDay() === taskDay;
  }

  checkDateIsCurrent(today, taskDate) {
    return taskDate.getDate() === today.getDate()
      && taskDate.getMonth() === today.getMonth()
      && taskDate.getFullYear() === today.getFullYear();
  }
}
