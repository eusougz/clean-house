import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  recurrent: boolean;
  canRegister = false;

  constructor() { }

  ngOnInit(): void {
  }

  isRecurrent(e) {
    if (e.value == 1) {
      this.recurrent = true;
    } else {
      this.recurrent = false;
    }
  }

  weekDays(e) {
    if (e.value.lenght != 0) {
      this.canRegister = true;
    }
  }

}
