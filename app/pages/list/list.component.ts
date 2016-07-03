import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { GroceryListService } from '../../shared/grocery/grocery-list.service';
import { Observable } from 'rxjs/Observable';
import { Grocery } from '../../shared/grocery/grocery';

import 'rxjs/add/operator/do';

@Component({
  selector: "list",
  providers: [GroceryListService],
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"]
})
export class ListPage implements OnInit {
  groceryList$: Observable<Array<Grocery>>;

  constructor(private groceryListService: GroceryListService) { }

  ngOnInit() {
    this.groceryList$ = this.groceryListService.load();

    this.groceryList$.do(n => console.log('n: ', n));
  }
}