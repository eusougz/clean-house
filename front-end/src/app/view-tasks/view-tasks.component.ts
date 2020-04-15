import { Component, OnInit, TrackByFunction } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TasksWeek } from '../models/tasks-week';
import { Task } from '../models/task';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss']
})
export class ViewTasksComponent implements OnInit {

  allTasksWeek: TasksWeek[];
  recurrentTasks: TasksWeek[] = [];
  notRecurrentTasks: Task[] = [];

  columns: number;

  constructor(
    private taskService: TaskService,
    private observer: BreakpointObserver
    ) { }

  ngOnInit(): void {
    this.fillTasks();

    this.columnsByPageWidth();
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

  columnsByPageWidth() {
    this.observer.observe(['(max-width: 899px)']).subscribe(state => {
      if (state.matches) { this.columns = 1; }
    });
    this.observer.observe(['(min-width: 900px) and (max-width: 1149px)']).subscribe(state => {
      if (state.matches) { this.columns = 2; }
    });
    this.observer.observe(['(min-width: 1150px) and (max-width: 1599px)']).subscribe(state => {
      if (state.matches) { this.columns = 3; }
    });
    this.observer.observe(['(min-width: 1600px)']).subscribe(state => {
      if (state.matches) { this.columns = 4; }
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
