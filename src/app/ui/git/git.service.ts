import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { Observable } from "rxjs";

export class User {
  public login?: string;
  public id?: string;
  public avatar_url?: string;
  public url?: string;
  public followers_url?: string;
  public email?: string;
  public followers?: User[];
  public repos?: Repos[];
}

export class Repos {
  public id?: string;
  public name?: string;
  public html_url?: string;
  public url?: string;
  public updated_at?: string;
  public has_pages?: boolean;
  public homepage?: string;
}

@Injectable()
export class GitService {
  private headers: HttpHeaders = new HttpHeaders();
  private gitApi: string = "https://api.github.com";

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

  private get(endPoint: string): Observable<any> {
    return this.http.get(this.createUrl(endPoint));
  }

  private createUrl(endPoint): string {
    let url = this.gitApi + endPoint;
    if (!endPoint.startsWith("/")) {
      url = this.gitApi + "/" + endPoint;
    }
    console.log(url)
    return url;
  }

  search(user: string): Observable<any> {
    return this.get(`/users/${user}`)
  }

  getUserInfo(endpoint: string): Observable<any> {
    return this.get(endpoint)
  }

}
