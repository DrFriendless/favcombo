import {Component, ViewChild} from '@angular/core';
import {FCItem, FavComboComponent } from "../../../fav-combo";

@Component({
  selector: 'app-root',
  imports: [FavComboComponent],
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {
  private DATA: (string | FCItem)[] = [
    "Serbia", "Montenegro", "Albania", "Moldova", "Transylvania", "Kosovo", "Moravia",
    { id: "Plovdiv", text: "Plovdiv", favourite: true, style: "banana" }
  ];
  public data: FCItem[] = this.DATA.map(x =>
    (typeof x === "string") ?
      { text: x, id: x, favourite: false } as FCItem :
      x as FCItem
  );
  @ViewChild('ro') ro: FavComboComponent | undefined;

  onCurrentItemChange($event: FCItem) {
    console.log("chosen");
    console.log($event);
    if (!this.data.map(x => x.id).includes($event.id)) {
      this.data = [...this.data, $event];
    }
    if (this.ro) this.ro.setChosen($event.id);
  }

  onFavouritesChange($event: FCItem[]) {
    console.log("favourites");
    console.log($event);
  }
}
