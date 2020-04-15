import { Component, OnInit } from '@angular/core';
import { UserPoints } from '../models/user-points';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  userPoints: UserPoints[] = [
    {
      name: 'gilberto.giacomin',
      points: 1220
    },
    {
      name: 'guilherme.giacomin',
      points: 680
    },
    {
      name: 'teteu.giacomin',
      points: 450
    },
    {
      name: 'rose.giacomin',
      points: 440
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
