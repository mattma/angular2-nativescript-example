import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HTTP_PROVIDERS } from '@angular/http';
import { Router } from "@angular/router-deprecated";
import { User } from '../../shared/user/user';
import { UserService } from '../../shared/user/user.service';
import {Page} from 'ui/page';
import {Color} from 'color';
import {View} from 'ui/core/view';

@Component({
  selector: "my-app",
  providers: [HTTP_PROVIDERS, UserService],
  templateUrl: 'pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginPage implements OnInit {
  user: User;
  isLoggingIn = true;
  // @ViewChild decorator to create a new property that points at the <StackLayout> element.
  @ViewChild('container') container: ElementRef;

  constructor (private userService: UserService, private router: Router, private page: Page) {
    this.user = new User();
    this.user.email = 'mattma@example.com';
    this.user.password = 'password';
  }

  ngOnInit() {
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
    this.isLoggingIn = !this.isLoggingIn;
    let container = <View>this.container.nativeElement;

    container.animate({
      backgroundColor: this.isLoggingIn ? new Color('white') : new Color('#301217'),
      duration: 200
    });
  }
}
