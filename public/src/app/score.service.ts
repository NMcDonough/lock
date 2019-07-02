import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private _http: HttpClient) { }

  updateHighscore(data) {
    console.log("updateHighscore hit. Received: ", data)
    console.log("Pinging http://localhost:8000/api/updateScore")
    return this._http.post("/api/updateScore", data)
  }
}
