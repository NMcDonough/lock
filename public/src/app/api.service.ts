import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  registerUser(user) {
    console.log('service sending data...');
    return this._http.post('http://localhost:8000/api/register', user);
  }

  login(user) {
    console.log('service is logging in...');
    return this._http.post('http://localhost:8000/api/login', user);
  }
}
