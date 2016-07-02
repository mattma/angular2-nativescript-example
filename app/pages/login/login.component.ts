import { Component } from "@angular/core";
import { HTTP_PROVIDERS } from '@angular/http';
import { User } from '../../shared/user/user';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: "my-app",
  providers: [HTTP_PROVIDERS, UserService],
  templateUrl: 'pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginPage {
  user: User;
  isLoggingIn = true;

  constructor (private userService: UserService) {
    this.user = new User();
    this.user.email = 'mattma';
    this.user.password = 'password';
  }

  submit () {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signup();
    }
  }

  login (): void {

  }

  signup (): void {
    this.userService.register(this.user)
      .subscribe((users)=> {
        if (users.length) {
          console.log(`successfully register user ${users[0].email}`);
          this.toggleDisplay();
        }
      }, () => alert('something went wrong'));
  }

  toggleDisplay (): void {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
