import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { ThemeService } from '../services/theme/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName;
  isThemeDark: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    public appService: AppService) { }

  ngOnInit(): void {
    this.userName = this.appService.UserName;
    this.isThemeDark = this.themeService.isThemeDark;
  }

  logout() {
    this.appService.logout();
  }

  changeDark(checked) {
    this.themeService.setDarkTheme(checked);
  }

}
