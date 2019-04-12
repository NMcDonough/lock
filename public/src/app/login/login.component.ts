import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatGridListModule } from '@angular/material/grid-list';

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

  constructor(private api: ApiService) { }

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
  }

  register() {
    console.log('submitted data:\n'  + this.newUser);
    this.api.registerUser(this.newUser)
    .subscribe(res => {
      if(res['err']){
        this.regMessage = res['err'];
      } else {
        this.regMessage = res['message'];
      }
    });
  }

  login() {
    console.log('submitting login info:\n' + this.user);
    this.api.login(this.user)
    .subscribe(res => {
      console.log('server response received:');
      console.log(res['message']);
      if(res['err']){
        this.logMessage = res['err'];
      } else {
        this.logMessage = res['message'];
      }
    })
  }
}
