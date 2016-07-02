import {Injectable} from "@angular/core";
// import {Http, Headers, Response} from "@angular/http";
import {User} from "./user";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
  // constructor(private _http: Http) {}
  
  fakeUser() {
    return Observable.of([{
      email: 'mattma',
      password: 'password'
    }]);
  }

  register(user: User) {
    return this.fakeUser()
      .map((users: Array<User>) =>
        users.filter((u: User) => u.email === user.email && u.password === user.password)
      );
  }
  
  login(user: User) {
    return this.fakeUser()
      .map((users: Array<User>) =>
        users.filter((u: User) => u.email === user.email && u.password === user.password)
      );
  }
}