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
    return this._http.post('http://localhost:8000/api/register', user);
  }

  login(user) {
    return this._http.post('http://localhost:8000/api/login', user);
  }

  getUser() {
    return this.user;
  }

  setUser() {
    this._http.get('http://localhost:8000/api/user/' + sessionStorage.user)
    .subscribe(res => {
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
    return this._http.delete("http://localhost:8000/api/delete/user/" + sessionStorage.user);
  }
}
