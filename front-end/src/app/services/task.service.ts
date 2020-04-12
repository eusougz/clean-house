import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { Task } from '../models/task';
import { TaskDay } from '../models/task-day';
import { SuccessfullyCreated } from '../models/successfully-created';
import { CompletedTask } from '../models/completed-task';
import { TaskView } from '../models/task-view';
import { Observable } from 'rxjs';

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

  getRecurrentTaskDay(taskId, userId) {
    return this.http.get<TaskDay>(`${environment.api}/tasksWeek/${userId}/${taskId}`);
  }

  taskCompleted(taskId): Observable<CompletedTask> {
    return this.http.get<CompletedTask>(`${environment.api}/completedTasks/${taskId}`);
  }

  todayTasks(tasks: Task[], userId) {
    let todayTasks: TaskView[] = [];
    const today: Date = new Date();

    tasks.forEach(task => {
      if (task.recurrent) {
        this.getRecurrentTaskDay(task.id, userId).subscribe(taskDay => {
          if (this.checkDayIsToday(today, parseInt(taskDay.day, 10))) {
            this.taskCompleted(task.id).subscribe(value => {
              console.log(value);
              todayTasks.push({
                task,
                completed: value.completed
              });
            });
          }
        });
      } else {
        if (this.checkDateIsCurrent(today, new Date(task.date))) {
          this.taskCompleted(task.id).subscribe(value => {
            todayTasks.push({
              task,
              completed: value.completed
            });
          });
        }
      }
    });

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
