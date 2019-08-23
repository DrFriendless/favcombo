import {
  Component,
  HostListener,
  forwardRef,
  Input,
  Output,
  EventEmitter, OnChanges, SimpleChanges, ViewChild, AfterViewInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FCItem } from './fav-combo.model';

export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FavComboComponent),
  multi: true
};
const noop = () => {};

@Component({
  selector: 'favouritable-combo',
  templateUrl: './fav-combo.component.html',
  styleUrls: ['./fav-combo.component.scss'],
  providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class FavComboComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
  @Input() data: Array<FCItem | String> = [];
  @Input() disabled = false;
  @Input('favouriteImage') favouriteImage: string | null;
  @Input('unfavouriteImage') unfavouriteImage: string | null;
  @Output() currentItem = new EventEmitter<FCItem>();
  @Output() favourites = new EventEmitter<FCItem[]>();
  @ViewChild('input', { static: false }) input;

  chosenItem: FCItem;
  open = false;
  filterText: string | undefined = undefined;
  private items: FCItem[] = [];
  private focused = false;

  setDisabledState(isDisabled: boolean): void {
    // TODO
  }

  writeValue(obj: any): void {
    // TODO
  }

  ngAfterViewInit(): void {
    this.setChosen(this.chosenItem);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      console.log(this.data);
      this.items = this.data.map(v => {
        if (typeof v === 'string') {
          return { favourite: false, id: v, text: v };
        } else {
          return v as FCItem;
        }
      });
    }
    if (!this.chosenItem) this.setChosen(this.items[0]);
  }

  private setChosen(item: FCItem): void {
    console.log("setChosen");
    console.log(item);
    console.log(this.input);
    this.chosenItem = item;
    if (this.input) this.input.nativeElement.value = this.chosenItem.text;
    this.closeDropdown();
    this.currentItem.emit(item);
  }

  private onTouchedCallback: () => void = noop;

  private onChangeCallback: (_: any) => void = noop;

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
      this.filterText = null;
    }
  }

  onFilterTextChange($event) {
    this.filterText = this.input.nativeElement.value;
  }

  shownItems() {
    return this.items.filter(i => FavComboComponent.applyFilter(i, this.filterText));
  }

  static applyFilter(item: FCItem, filter: string): boolean {
    return !(filter && item.text && item.text.toLowerCase().indexOf(filter.toLowerCase()) === -1);
  }

  onFavouriteChanges() {
    this.favourites.emit(this.items.filter(item => item.favourite));
  }

  onItemClick($event: unknown, item: FCItem) {
    this.setChosen(item);
    this.filterText = null;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // Set touched on blur
  @HostListener('blur')
  public onTouched() {
    this.closeDropdown();
    this.onTouchedCallback();
  }

  onClick(evt: MouseEvent) {
    if (this.disabled) return;
    evt.preventDefault();
    if (this.focused) {
      this.open = true;
      this.input.nativeElement.select();
    }
  }

  toggleOpen(evt: MouseEvent) {
    this.open = !this.open;
  }

  closeDropdown() {
    this.open = false;
  }
}
