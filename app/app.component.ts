import { Component, OnInit } from '@angular/core';
import { CityService } from './model/city.service';
import { CountryService } from './model/country.service';
import { City } from './model/city';
import { CityList } from './model/city-list';
import { Country } from './model/country';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["bootstrap.min.css"],
    providers: [CityService, CountryService]
})
export class AppComponent implements OnInit{ 
    constructor (private cityService:CityService, 
                    private countryService:CountryService){}
    
    //--Data Model--//
    title = "Cities of the World";
    selectedCity:City;
    cityList:CityList;
    selectedCityCountry:Country;
    selectedCityCountryCapital:City;
    //--Data Model--//
    
    ngOnInit():void{
        this.cityService.getCityById(1).subscribe(p => this.selectedCity = p);
        this.cityService.getCityList().subscribe(p => this.cityList = p);
        this.countryService.getCountryByCode("AFG")
            .subscribe(p=>{
                            this.selectedCityCountry=p;
                            this.cityService.getCityById(this.selectedCityCountry.capital).subscribe(p=>this.selectedCityCountryCapital=p);
            });
    }

     selectedCityChange(city:any) {
        this.selectedCity = city.value as City;
        this.countryService.getCountryForCity(this.selectedCity)
            .subscribe(p=>{
                            this.selectedCityCountry=p;
                            this.cityService.getCityById(this.selectedCityCountry.capital).subscribe(p=>this.selectedCityCountryCapital=p);        
        });
     }

}
