import { Injectable } from "@angular/core";
import { Grocery } from "./grocery";
import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/delay';

@Injectable()
export class GroceryListService {
  count: number = 4;
  defaultGroceryList: Array<Grocery> = [
    new Grocery('1', 'Apples'),
    new Grocery('2', 'Oranges'),
    new Grocery('3', 'peaches'),
    new Grocery('4', 'Grapes')
  ];

  getFakeGroceryList (): Array<Grocery> {
    return this.defaultGroceryList;
  }

  load (): Observable<Array<Grocery>> {
    return Observable.of(this.getFakeGroceryList())
      .delay(3000);
  }

  add (grocery: string) {
    this.defaultGroceryList.unshift(new Grocery(`${this.count++}`, grocery));
    return Observable.of(this.defaultGroceryList);
  }
}
