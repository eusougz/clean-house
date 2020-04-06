import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.userName = this.appService.UserName;
  }

  logout() {
    this.appService.logout();
  }

}
