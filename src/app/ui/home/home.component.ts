import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers
    .set("Content-Type", "application/json")
    .append(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    )
    .append("Access-Control-Allow-Origin", "*")
    .append(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"
    );
   }

  ngOnInit() {
    this.getComic().subscribe(res => {
      console.log(res)
    }, err => console.log(err))
  }

  private getComic(): Observable<any> {
    return this.http.get('https://xkcd.com/info.0.json');
  }
}
