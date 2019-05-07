import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cast } from '../../assets/helpers.js';
import _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  date: any;
  highscores = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getUser().subscribe(res => {

      res == {} ? (
        this.api.setUser(),
        this.user = this.api.getUser().subscribe(res => {
          this.user = res;
          _.map(Object.keys(res['highscores']), score => {
            this.highscores.push(score);
          })
        })
      ) : this.user = res;
    });
  }

  getDate(){
    return cast(this.user.createdAt, 'date')
  }

  getHighscores() {
    console.log("High scores", this.user.highscores);
    return Object.keys(this.user.highscores);
  }

  deleteAccount() {
    console.log("telling service to delete account");
    this.api.deleteAccount()
    .subscribe(res => {
      console.log("Response received from server:")
      console.log(res);
      this.router.navigateByUrl('/');
    });
  }
}
