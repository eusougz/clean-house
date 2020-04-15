import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'first-app';
  isThemeDark: Observable<boolean>;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isThemeDark = this.themeService.isThemeDark;
  }
}
