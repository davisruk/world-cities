import { Component, OnInit } from '@angular/core';
import { CityService } from './model/city.service';
import { City } from './model/city';
import { CityList } from './model/city-list';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["bootstrap.min.css"],
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
