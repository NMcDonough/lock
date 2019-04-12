import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: any;
  user: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.newUser = {
      username: "",
      email: "",
      password: "",
      confirm: ""
    }
    this.user = {
      email: "",
      password: ""
    }
  }

  register() {
    console.log("submitted data:\n"  + this.newUser);
    this.api.registerUser(this.newUser)
    .subscribe(res => {
      console.log(res);
    });
  }

  login() {
    console.log("submitting login info:\n" + this.user);
    this.api.login(this.user)
    .subscribe(res => {
      console.log("server response received:");
      console.log(res['message']);
    })
  }
}
