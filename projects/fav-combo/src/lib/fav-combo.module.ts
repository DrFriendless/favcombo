import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavComboComponent } from './fav-combo.component';
import { ClickOutsideDirective } from './click-outside.directive';
import {ItemCheckboxComponent} from './item-checkbox/item-checkbox.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [FavComboComponent, ClickOutsideDirective, ItemCheckboxComponent],
  exports: [FavComboComponent]
})

export class FavComboModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: FavComboModule
      };
    }
}
