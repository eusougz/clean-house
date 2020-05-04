import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'first-app';
  isThemeDark: Observable<boolean>;
  mobile: boolean;

  constructor(
    private observer: BreakpointObserver,
    private themeService: ThemeService) {}

  ngOnInit() {
    this.isThemeDark = this.themeService.isThemeDark;

    this.observer.observe(['(max-width: 900px)']).subscribe(state => {
      this.mobile = state.matches;
    });
  }
}
