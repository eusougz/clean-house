import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasksWeek } from 'src/app/models/tasks-week';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-task-recurrent',
  templateUrl: './task-recurrent.component.html',
  styleUrls: ['./task-recurrent.component.scss']
})
export class TaskRecurrentComponent implements OnInit {

  @Input() taskWeek: TasksWeek;
  @Output() refresh = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  edit() {
    this.dialog.open(EditComponent, { data: this.taskWeek })
      .afterClosed().subscribe(() => this.refresh.emit(true));
  }

  delete() {
    this.dialog.open(DeleteComponent, { data: this.taskWeek.task.id })
      .afterClosed().subscribe(deleted => this.refresh.emit(deleted));
  }

}
