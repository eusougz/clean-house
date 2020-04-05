import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // userName: string;

  constructor(public appService: AppService) { }

  // To do
  ngOnInit(): void {
    // this.userName = this.appService.getUserName();
  }

  logout() {
    this.appService.logout();
  }

}
