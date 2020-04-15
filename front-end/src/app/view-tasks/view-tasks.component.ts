import { Component, OnInit, TrackByFunction } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TasksWeek } from '../models/tasks-week';
import { Task } from '../models/task';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss']
})
export class ViewTasksComponent implements OnInit {

  allTasksWeek: TasksWeek[];
  recurrentTasks: TasksWeek[] = [];
  notRecurrentTasks: Task[] = [];

  columns = 4;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.fillTasks();
  }

  refresh(e) {
    if (e) {
      this.allTasksWeek = [];
      this.recurrentTasks = [];
      this.notRecurrentTasks = [];
      this.fillTasks();
    }
  }

  fillTasks() {
    this.taskService.AllTasks.subscribe(value => {
      this.allTasksWeek = value;
      this.allTasksWeek.forEach(taskWeek => {
        if (taskWeek.days.length === 0) {
          this.notRecurrentTasks.push(taskWeek.task);
        } else {
          this.recurrentTasks.push(taskWeek);
        }
      });
    });
  }

  /**
   * font: https://stackblitz.com/edit/record-in-every-cell?file=src%2Fapp%2Fapp.component.ts
   */
  public get recurrentTable(): number[][] {
    const rowCount = Math.floor(this.recurrentTasks.length / this.columns);
    const remainder = this.recurrentTasks.length % this.columns;
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(this.recurrentTasks.slice(i * this.columns, (i * this.columns) + this.columns));
    }
    if (remainder) {
      rows.push(this.recurrentTasks.slice(this.recurrentTasks.length - remainder, this.recurrentTasks.length));
    }
    return rows;
  }

  public get notRecurrentTable(): number[][] {
    const rowCount = Math.floor(this.notRecurrentTasks.length / this.columns);
    const remainder = this.notRecurrentTasks.length % this.columns;
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(this.notRecurrentTasks.slice(i * this.columns, (i * this.columns) + this.columns));
    }
    if (remainder) {
      rows.push(this.notRecurrentTasks.slice(this.notRecurrentTasks.length - remainder, this.notRecurrentTasks.length));
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
