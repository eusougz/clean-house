import { Component, OnInit } from '@angular/core';
import { UserPoints } from '../models/user-points';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  smallScreen: boolean;

  userPoints: UserPoints[] = [
    {
      name: 'gilberto.giacomin',
      points: 1220
    },
    {
      name: 'guilherme.giacomin',
      points: 600
    },
    {
      name: 'teteu.giacomin',
      points: 590
    },
    {
      name: 'rose.giacomin',
      points: 580
    },
    {
      name: 'camila.giacomin',
      points: 0
    }
  ];

  constructor(private observer: BreakpointObserver) { }

  ngOnInit(): void {
    this.smallScreen = false;
    this.observer.observe(['(max-width: 900px)']).subscribe(state => {
      if (state.matches) { this.smallScreen = true; }
    });
  }

}
