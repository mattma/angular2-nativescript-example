import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {User} from "./user";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
  constructor(private _http: Http) {}

  register(user: User) {
    console.log('email: ', user.email);
    console.log('password: ', user.password);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http.post(
      "https://api.everlive.com/v1/GWfRtXi1Lwt4jcqK/Users",
      JSON.stringify({
        Username: user.email,
        Email: user.email,
        Password: user.password
      }),
      { headers: headers }
    )
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}