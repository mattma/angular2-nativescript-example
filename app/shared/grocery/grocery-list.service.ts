import { Injectable } from "@angular/core";
import { Grocery } from "./grocery";
import { Observable } from "rxjs/Rx";

@Injectable()
export class GroceryListService {
  getFakeGroceryList (): Array<Grocery> {
    return [
      new Grocery('1', 'Apples'),
      new Grocery('2', 'Oranges'),
      new Grocery('3', 'peaches'),
      new Grocery('4', 'Grapes')
    ];
  }

  load (): Observable<Array<Grocery>> {
    return Observable.of(this.getFakeGroceryList());
  }
}
