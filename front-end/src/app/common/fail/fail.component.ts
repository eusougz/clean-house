import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.scss']
})
export class FailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FailComponent>,
    @Inject(MAT_DIALOG_DATA) public message
  ) { }

  ngOnInit(): void {
  }

}
