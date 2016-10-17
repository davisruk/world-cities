import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { CityListComponent } from './city-list/city-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ AppComponent, CityDetailComponent, CityListComponent, CountryDetailComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
