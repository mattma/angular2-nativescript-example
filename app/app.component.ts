import { Component } from "@angular/core";
import {HTTP_PROVIDERS} from '@angular/http';
import { User } from './shared/user/user';
import { UserService } from './shared/user/user.service'

@Component({
  selector: "my-app",
  providers: [HTTP_PROVIDERS, UserService],
  templateUrl: 'pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class AppComponent {
  user: User;
  isLoggingIn = true;

  constructor (private userService: UserService) {
    this.user = new User();
  }

  submit () {
    if (this.isLoggingIn) {
      this.login()
    } else {
      this.signup();
    }
  }

  login(): void {

  }

  signup(): void {
    this.userService.register(this.user)
      .subscribe(()=> {
        alert('successfully logged in');
        this.toggleDisplay();
      }, () => alert('something went wrong'));
  }

  toggleDisplay (): void {
    console.log('click toggle');
    this.isLoggingIn = !this.isLoggingIn;
  }
}
