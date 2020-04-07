import { Component, OnInit, TrackByFunction } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks: Task[] = [];

  private readonly columns = 2;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.Tasks.subscribe(value => this.tasks = value);
  }


  /**
   * font: https://stackblitz.com/edit/record-in-every-cell?file=src%2Fapp%2Fapp.component.ts
   */
  public get table(): number[][] {
    const rowCount = Math.floor(this.tasks.length / this.columns);
    const remainder = this.tasks.length % this.columns;
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(this.tasks.slice(i * this.columns, (i * this.columns) + this.columns))
    }
    if (remainder) {
      rows.push(this.tasks.slice(this.tasks.length - remainder, this.tasks.length));
    }
    return rows;
  };

  /**
   * https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5
   */
  public trackRow: TrackByFunction<number[]> = (index, item) => {
    return index;
  };

  /**
   * https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5
   */
  public trackRecord: TrackByFunction<number> = (index, item) => {
    return item;
  };


}
