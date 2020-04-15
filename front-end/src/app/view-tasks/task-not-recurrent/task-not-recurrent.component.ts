import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-task-not-recurrent',
  templateUrl: './task-not-recurrent.component.html',
  styleUrls: ['./task-not-recurrent.component.scss']
})
export class TaskNotRecurrentComponent implements OnInit {

  @Input() task: Task;
  @Output() refresh = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  edit() {
    this.dialog.open(EditComponent, { data: { task: this.task, days: [] } })
      .afterClosed().subscribe(() => this.refresh.emit(true));
  }

  delete() {
    this.dialog.open(DeleteComponent, { data: this.task.id })
      .afterClosed().subscribe(deleted => this.refresh.emit(deleted));
  }

}
