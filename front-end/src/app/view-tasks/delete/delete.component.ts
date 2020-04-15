import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public taskId) { }

  ngOnInit(): void {
  }

  close(deleted) {
    this.dialogRef.close(deleted);
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId).subscribe(() => this.close(true));
  }

}
