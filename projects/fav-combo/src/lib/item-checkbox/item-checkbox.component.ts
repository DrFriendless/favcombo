import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FCItem} from '../fav-combo.model';

@Component({
  selector: 'fc-item-check',
  templateUrl: './item-checkbox.component.html',
  styleUrls: ['./item-checkbox.component.css']
})
export class ItemCheckboxComponent implements OnChanges, OnInit {
  @Input() favouriteImage: string | null;
  @Input() unfavouriteImage: string | null;
  @Input() item: FCItem;
  @Output() changes = new EventEmitter<FCItem>();
  private background: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    this.setBackgroundImage();
  }

  private setBackgroundImage(): void {
    if (this.item.favourite) {
      this.background = this.favouriteImage;
    } else {
      this.background = this.unfavouriteImage;
    }
  }

  ngOnInit(): void {
    this.setBackgroundImage();
  }

  onItemCheck($event: MouseEvent): void {
    this.item.favourite = !this.item.favourite;
    this.setBackgroundImage();
    this.changes.next(this.item);
  }
}
