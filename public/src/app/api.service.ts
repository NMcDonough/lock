import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user = new BehaviorSubject(new Object);
  currentUser = this.user.asObservable();

  changeUser(user: Object) {
    this.user.next(user);
  }

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    if(sessionStorage.user) {
      this.setUser();
    }
  }

  registerUser(user) {
    return this._http.post('/api/register', user);
  }

  login(user) {
    return this._http.post('/api/login', user);
  }

  getUser() {
    console.log("GetUser method hit. CurrentUser:", this.currentUser);
    return this.currentUser !== undefined ? this.user : this.user;
  }

  setUser() {
    this._http.get('/api/user/' + sessionStorage.user)
    .subscribe(res => {
      console.log("User api is setting user to following:", res['user'])
      this.changeUser(res['user']);
      return this.user;
    });
  }

  logout() {
    this.changeUser(Object);
    sessionStorage.removeItem('user');
  }

  deleteAccount() {
    console.log("Telling API to delete account")
    return this._http.delete("/api/delete/user/" + sessionStorage.user);
  }
}
