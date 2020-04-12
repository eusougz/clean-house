import { Component, OnInit, TrackByFunction } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { AppService } from '../services/app.service';
import { TaskView } from '../models/task-view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks: Task[] = [];
  tasksView: TaskView[] = [];
  userId;

  private readonly columns = 2;

  constructor(
    private appService: AppService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.userId = this.appService.UserName;
    this.taskService.Tasks.subscribe(value => {
      this.tasks = value;
      this.tasksView = this.taskService.todayTasks(this.tasks, this.userId);
      console.log(this.tasksView);
    });
  }


  /**
   * font: https://stackblitz.com/edit/record-in-every-cell?file=src%2Fapp%2Fapp.component.ts
   */
  public get table(): number[][] {
    const rowCount = Math.floor(this.tasksView.length / this.columns);
    const remainder = this.tasksView.length % this.columns;
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(this.tasksView.slice(i * this.columns, (i * this.columns) + this.columns));
    }
    if (remainder) {
      rows.push(this.tasksView.slice(this.tasksView.length - remainder, this.tasksView.length));
    }
    return rows;
  }

  /**
   * https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5
   */
  public trackRow: TrackByFunction<number[]> = (index, item) => {
    return index;
  }

  /**
   * https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5
   */
  public trackRecord: TrackByFunction<number> = (index, item) => {
    return item;
  }


}
