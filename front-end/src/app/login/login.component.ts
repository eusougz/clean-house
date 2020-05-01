import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { User } from '../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: FormControl = new FormControl('', Validators.required);
  newUserName: FormControl = new FormControl('', Validators.required);
  login: boolean = true;

  constructor(
    private userService: UserService,
    private appService: AppService) { }

  ngOnInit(): void {
    this.appService.logout();
  }

  auth() {
    const isAuthenticated  = this.appService.login(this.userName.value);

    if (isAuthenticated) {
      this.goToHome();
    }
    return isAuthenticated;
  }

  goToRegisterForm() {
    this.login = false;
  }

  register() {
    this.login = true;
    this.userService.newUser(this.newUserName.value).subscribe();
  }

  goToHome() {
    return '/home';
  }

}
