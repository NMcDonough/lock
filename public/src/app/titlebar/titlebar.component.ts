import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {
  loggedIn: any;
  user: any;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    if(sessionStorage.user) {
      this.api.setUser();
      this.user = this.api.getUser()['_value'];
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    this.user = this.api.currentUser.subscribe(res => {
      if(res['_id'])
        this.loggedIn = true;
      return res;
    });
  }

  logout() {
    this.loggedIn = false;
    this.api.logout();
    this.router.navigateByUrl('/');
  }

  getUserName() {

    return this.user._subscriptions[0].subject._value ? (
      this.user._subscriptions[0].subject._value.username
      ) : (
        null
        );
  }
}
