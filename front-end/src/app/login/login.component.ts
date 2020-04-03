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

  users: User[];

  login: FormControl = new FormControl('', Validators.required);

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUsers().subscribe(value => this.users = value);
  }

  auth() {
    const isAuthenticated  = this.users.includes({ name: this.login.value });
    if (isAuthenticated) {
      this.goToHome();
    }
    return isAuthenticated;
  }

  goToHome() {
    return '/home';
  }

}
