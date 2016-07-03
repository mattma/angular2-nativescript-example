import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router-deprecated";
import { Page } from 'ui/page';
import { Color } from 'color';
import { View } from 'ui/core/view';
import { TextField } from 'ui/text-field';

import { User } from '../../shared/user/user';
import { UserService } from '../../shared/user/user.service';
import { setHintColor } from '../../utils/hint-util';

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: 'pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginPage implements OnInit {
  user: User;
  isLoggingIn = true;
  // @ViewChild decorator to create a new property that points at the <StackLayout> element.
  @ViewChild('container') container: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor (private userService: UserService, private router: Router, private page: Page) {
    this.user = new User();
    this.user.email = 'mattma@example.com';
    this.user.password = 'password';
  }

  ngOnInit () {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = this.page.ios ? 'res://bg_login.jpg' : 'res://bg_login';
  }

  submit () {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }

    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signup();
    }
  }

  login (): void {
    this.userService.login(this.user)
      .subscribe((users)=> {
        if (users.length) {
          this.router.navigate(['List']);
        } else {
          alert('username or password is incorrect!')
        }
      }, () => alert('Unfortunately we could not find your account.'));
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
    const container = <View>this.container.nativeElement;

    this.isLoggingIn = !this.isLoggingIn;
    this.setTextFieldColors();

    container.animate({
      backgroundColor: this.isLoggingIn ? new Color('white') : new Color('#301217'),
      duration: 200
    });
  }

  setTextFieldColors () {
    const emailTextField = <TextField>this.email.nativeElement;
    const passwordTextField = <TextField>this.password.nativeElement;

    const mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

    const hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
  }
}
