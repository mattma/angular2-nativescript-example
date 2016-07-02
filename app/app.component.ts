import { Component } from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {LoginPage} from "./pages/login/login.component";

@Component({
  selector: "my-app",
  directives: [NS_ROUTER_DIRECTIVES],
  providers: [NS_ROUTER_PROVIDERS],
  template: `<page-router-outlet></page-router-outlet>`
})
@RouteConfig([
  {path: '/login', component: LoginPage, name: 'Login', useAsDefault: true}
])
export class AppComponent {}
