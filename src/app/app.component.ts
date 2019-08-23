import { Component } from '@angular/core';
import {FCItem} from '../../projects/fav-combo/src/lib/fav-combo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private DATA: (string | FCItem)[] = [
    "Serbia", "Montenegro", "Albania", "Moldova", "Transylvania", "Kosovo", "Moravia",
    { id: "Plovdiv", text: "Plovdiv", favourite: true }
  ];
  public data: FCItem[] = this.DATA.map(x =>
    (typeof x === "string") ?
      { text: x, id: x, favourite: false } as FCItem :
      x as FCItem
  );

  onCurrentItemChange($event: FCItem) {
    console.log("item");
    console.log($event);
    if (!this.data.map(x => x.id).includes($event.id)) {
      this.data = [...this.data, $event];
    }
  }

  onFavouritesChange($event: FCItem[]) {
    console.log("favourites");
    console.log($event);
  }
}
