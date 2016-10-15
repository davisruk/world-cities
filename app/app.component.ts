import { Component, OnInit } from '@angular/core';
import { CityService } from './model/city.service';
import { City } from './model/city';
import { CityList } from './model/city-list';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
                <city-detail [city]="selectedCity"></city-detail>
                <city-list [cityList]="cityList" (cityChange)="selectedCityChange($event)"></city-list>
                `,
    providers: [CityService]
})
export class AppComponent implements OnInit{ 
    constructor (private cityService:CityService){}
    title = "Cities of the World";
    selectedCity:City;
    cityList:CityList;

    ngOnInit():void{
        //this.selectedCity=this.cityService.getCity();
        this.cityService.getCityById(1).subscribe(p => this.selectedCity = p);
        this.cityService.getCityList().subscribe(p => this.cityList = p);
    }
     selectedCityChange(city:any) {
        this.selectedCity = city.value as City;
  }
}
