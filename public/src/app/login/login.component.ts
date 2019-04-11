import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.newUser = {
      username: "",
      email: "",
      password: "",
      confirm: ""
    }
  }

  submit() {
    console.log("submitted data:\n"  + this.newUser);
    this.api.registerUser(this.newUser)
    .subscribe(res => {
      console.log(res);
    });
  }
}
