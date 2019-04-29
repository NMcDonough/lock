import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: any;
  user: any;
  regMessage: any;
  logMessage: any;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.newUser = {
      username: '',
      email: '',
      password: '',
      confirm: ''
    }
    this.user = {
      email: '',
      password: ''
    }
    this.regMessage = {
      type: '',
      msg: ''
    }
    this.logMessage = {
      type: '',
      msg: ''
    }
  }

  register() {
    console.log('submitted data:\n'  + this.newUser);
    this.api.registerUser(this.newUser)
    .subscribe(res => {
      console.log("server response received")
      if(res['error']) {
        this.regMessage.msg = res['message'];
        this.regMessage.type = 'red';
      } else {
        this.regMessage.msg = res['message'];
        this.regMessage.type = 'grn';
        this.newUser = {
          email: '',
          username: '',
          password: '',
          confirm: ''
        }
      }
    });
  }

  login() {
    console.log('submitting login info:\n' + this.user);
    this.api.login(this.user)
    .subscribe(res => {
      console.log('server response received');
      if(res['error']) {
        this.logMessage.msg = res['message'];
        this.logMessage.type = 'red';
      } else {
        sessionStorage.setItem('user', res['user']);
        console.log("User id stored in session. Telling API to save user data")
        this.api.setUser();
        this.router.navigateByUrl('/');
      }
    });
  }
}
