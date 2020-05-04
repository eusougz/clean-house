import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { AppService } from '../services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../common/success/success.component';
import { FailComponent } from '../common/fail/fail.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {


  smallScreen: boolean;

  canRegister = false;

  recurrent: boolean;
  taskName: FormControl;
  duration: FormControl;
  taskDate: FormControl;
  taskDaysOfWeek: number[];


  constructor(
    private observer: BreakpointObserver,
    private appService: AppService,
    private taskService: TaskService,
    private dialog: MatDialog
    ) {
    this.taskName = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.taskDate = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 900px)'])
    .subscribe(state => {
      this.smallScreen = state.matches;
    });
  }

  isRecurrent(e) {
    if (e.value == 1) {
      this.recurrent = true;
    } else {
      this.recurrent = false;
    }
  }

  weekDays(e) {
    this.taskDaysOfWeek = e.value;
    this.canRegister = true;
  }

  onChangeDate(e) {
    this.canRegister = true;
  }

  register() {
    if (this.recurrent) {
      const model = {
        user_id: this.appService.UserName,
        name: this.taskName.value,
        duration: this.duration.value.toString(),
        recurrent: true,
        days: this.taskDaysOfWeek
      };
      this.taskService.addTask(model).subscribe(value => this.taskCreated(value.id));
    } else {
      const model = {
        user_id: this.appService.UserName,
        name: this.taskName.value,
        duration: this.duration.value.toString(),
        recurrent: false,
        date: this.taskDate.value
      };
      this.taskService.addTask(model).subscribe(value => this.taskCreated(value.id));
    }
  }

  taskCreated(taskId) {
    if (taskId > 0) {
      this.dialog.open(SuccessComponent, { data: 'Tarefa cadastrada' });
    } else {
      this.dialog.open(FailComponent, { data: 'Tarefa não cadastrada, confira os dados' });
    }
  }

}
