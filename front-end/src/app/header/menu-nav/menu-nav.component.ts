import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { IgxNavDrawerItemDirective } from 'igniteui-angular';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  mobileQuery: MediaQueryList;

  userName;
  isThemeDark: Observable<boolean>;

  private _mobileQueryListener: () => void;

  constructor(
    private themeService: ThemeService,
    public appService: AppService,
    private breakpointObserver: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

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
