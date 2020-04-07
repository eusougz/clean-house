import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  today: Date;
  isToday = false;

  constructor() { }

  ngOnInit(): void {
    this.today = new Date();

    if (this.task.recurrent) {
      console.log(this.checkDayIsToday());
    } else {
      // this.isToday = this.checkDateIsCurrent();
    }
  }

  checkDayIsToday() {
    return this.today.getDay();
  }

  checkDateIsCurrent() {
    return this.task.date.getDate() == this.today.getDate()
      && this.task.date.getMonth() == this.today.getMonth()
      && this.task.date.getFullYear() == this.today.getFullYear();
  }




}
