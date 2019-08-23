import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FavComboModule } from '../../projects/fav-combo/src/lib/fav-combo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FavComboModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
