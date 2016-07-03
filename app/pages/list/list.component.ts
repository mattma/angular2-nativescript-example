import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { GroceryListService } from '../../shared/grocery/grocery-list.service';
import { Observable } from 'rxjs/Observable';
import { Grocery } from '../../shared/grocery/grocery';
import {TextField} from 'ui/text-field';

const socialShare = require("nativescript-social-share");

@Component({
  selector: "list",
  providers: [GroceryListService],
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"]
})
export class ListPage implements OnInit {
  groceryList$: Observable<Array<Grocery>>;
  grocery: string = '';
  isLoading: boolean = false;
  listLoaded: boolean = false;
  @ViewChild('groceryTextField') groceryTextField: ElementRef;

  constructor(private groceryListService: GroceryListService) { }

  ngOnInit() {
    this.isLoading = true;
    this.groceryList$ = this.groceryListService.load();

    this.groceryList$.subscribe(() => {
      this.isLoading = false;
      this.listLoaded = true;
    });
  }

  add() {
    if (this.grocery.trim() === '') {
      alert("Enter a grocery item");
      return;
    }

    // Dismiss the keyboard
    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this.groceryList$ = this.groceryListService.add(this.grocery);
    textField.text = '';
  }

  share() {
    this.groceryList$.subscribe((groceries: Array<Grocery>) => {
      const list = groceries.map((grocery: Grocery) => grocery.name).join(", ").trim();
      socialShare.shareText(list);
    });
  }
}