import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskView } from 'src/app/models/task-view';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() taskView: TaskView;

  completed: boolean;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.completed = this.taskView.completed;
  }

  complete() {
    const today: Date = new Date();

    this.taskService.completeTask(this.taskView.task.id, today).subscribe(value => {
      if (value.id > 0) {
        this.completed = true;
      }
    });
  }

}
