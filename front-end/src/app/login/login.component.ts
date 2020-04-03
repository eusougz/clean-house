import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { User } from '../models/user';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: FormControl = new FormControl('', Validators.required);

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  auth() {
    const isAuthenticated  = this.appService.login(this.userName.value);

    if (isAuthenticated) {
      this.goToHome();
    }
    return isAuthenticated;
  }

  goToHome() {
    return '/home';
  }

}
