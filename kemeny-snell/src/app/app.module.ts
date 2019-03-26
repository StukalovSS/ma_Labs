import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputRangeComponent } from './input-range/input-range.component';
import { CompTableComponent } from './comp-table/comp-table.component';

@NgModule({
  declarations: [
    AppComponent,
    InputRangeComponent,
    CompTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
