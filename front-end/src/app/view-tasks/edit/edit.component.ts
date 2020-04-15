import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksWeek } from 'src/app/models/tasks-week';
import { FormControl, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  recurrent = true;
  taskName: FormControl;
  duration: FormControl;
  taskDate: FormControl;
  weekDaysSelected: string[];

  canEdit = true;
  errorMessage = false;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public taskWeek: TasksWeek) { }

  ngOnInit(): void {
    if (this.taskWeek.days.length === 0) {
      this.recurrent = false;
    }
    this.taskName = new FormControl(this.taskWeek.task.name, Validators.required);
    this.duration = new FormControl(this.taskWeek.task.duration, Validators.required);
    this.taskDate = new FormControl(this.taskWeek.task.date, Validators.required);
  }

  edit() {
    if (this.completedForm()) {
      const model = {
        id: this.taskWeek.task.id,
        name: this.taskName.value,
        duration: this.duration.value,
        date: this.taskDate.value,
        recurrent: this.recurrent,
        days: this.weekDaysSelected
      };
      this.taskService.edit(model).subscribe(() => this.dialogRef.close());
    } else {
      this.errorMessage = true;
    }
  }

  weekDays(e) {
    this.weekDaysSelected = e.value;
    if (this.weekDaysSelected.length === 0) {
      this.canEdit = false;
    } else {
      this.canEdit = true;
    }
  }

  completedForm() {
    if (this.taskName.value === '' || this.duration.value === null) {
      return false;
    }
    return true;
  }
}
