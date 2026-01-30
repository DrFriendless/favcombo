import {
  Component,
  Input,
  Output,
  EventEmitter, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef, HostListener
} from '@angular/core';
import { FCItem } from './fav-combo.model';
import {NgClass} from "@angular/common";
import {ItemCheckboxComponent} from "./item-checkbox/item-checkbox.component";
import {ClickOutsideDirective} from "./click-outside.directive";

@Component({
  selector: 'favouritable-combo',
  templateUrl: './fav-combo.component.html',
  styleUrls: ['./fav-combo.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    ItemCheckboxComponent,
    ClickOutsideDirective
  ]
})
export class FavComboComponent implements OnChanges, AfterViewInit {
  @Input() data: Array<FCItem | string> = [];
  @Input() disabled: string | boolean = false;
  @Input('favouriteImage') favouriteImage!: string;
  @Input('unfavouriteImage') unfavouriteImage!: string;
  @Output() currentItem = new EventEmitter<FCItem>();
  @Output() favourites = new EventEmitter<FCItem[]>();
  @ViewChild('input', { static: false }) input!: ElementRef;

  chosenItem: FCItem | undefined;
  open = false;
  filterText: string = "";
  private items: FCItem[] = [];
  private focused = false;

  ngAfterViewInit(): void {
    this.setChosen(this.chosenItem);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.items = this.data.map(v => {
        if (typeof v === typeof "") {
          return { favourite: false, id: v.toString(), text: v.toString() };
        } else {
          return v as FCItem;
        }
      });
    }
    if (!this.chosenItem) this.setChosen(this.items[0]);
  }

  public setChosen(item: FCItem | string | undefined): void {
    if (typeof item === typeof "") {
      item = this.items.filter(i => i.id === item)[0];
    }
    this.chosenItem = item as FCItem | undefined;
    if (this.input) {
      this.input.nativeElement.value = this.chosenItem?.text || "";
    }
    this.closeDropdown();
    this.currentItem.emit(this.chosenItem);
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
  }

  onKey($event: KeyboardEvent) {
    if ($event.key === "Escape") {
      this.open = false;
    } else if ($event.key === "Enter") {
      const item = this.input.nativeElement.value;
      this.setChosen({ text: item, favourite: false, id: item } as FCItem);
      this.filterText = "";
    }
  }

  onFilterTextChange(ignored: any) {
    this.filterText = this.input.nativeElement.value;
  }

  calcStyle(item: FCItem): any {
    if (!item.style) return {};
    const result: any = {};
    result[item.style] = true;
    return result;
  }

  shownItems(): FCItem[] {
    return this.items.filter(i => FavComboComponent.applyFilter(i, this.filterText));
  }

  static applyFilter(item: FCItem, filter: string | undefined): boolean {
    return !(filter && item.text && item.text.toLowerCase().indexOf(filter.toLowerCase()) === -1);
  }

  onFavouriteChanges() {
    this.favourites.emit(this.items.filter(item => item.favourite));
  }

  onItemClick($event: unknown, item: FCItem) {
    this.setChosen(item);
    this.filterText = "";
  }

  // Set touched on blur
  @HostListener('blur')
  public onTouched() {
    this.closeDropdown();
  }

  onClick(evt: MouseEvent) {
    if (this.disabled === true || this.disabled === "true") return;
    evt.preventDefault();
    if (this.focused) {
      this.open = true;
      this.input.nativeElement.select();
    }
  }

  toggleOpen(ignored: MouseEvent) {
    if (this.disabled === true || this.disabled === "true") return;
    this.open = !this.open;
  }

  closeDropdown() {
    this.open = false;
  }
}
