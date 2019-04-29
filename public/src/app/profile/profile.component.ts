import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cast } from '../../assets/helpers.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  date: any;
  objectKeys: any;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.api.getUser().subscribe(res => {

      res == {} ? (
        this.api.setUser(),
        this.user = this.api.getUser().subscribe(res => {
          this.user = res;
        })
      ) : this.user = res;
    });

    this.objectKeys = Object.keys;
  }

  getDate(){
    return cast(this.user.createdAt, 'date')
  }

  getHighscores() {
    return Object.keys(this.user.highscores);
  }

  deleteAccount() {
    console.log("telling service to delete account");
    this.api.deleteAccount()
    .subscribe(res => {
      console.log("Response received from server:")
      console.log(res);
    });
  }
}
