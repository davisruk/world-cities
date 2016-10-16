import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CityList} from '../model/city-list';
import {CityService} from '../model/city.service';
import {City} from '../model/city';
@Component({
    moduleId: module.id,
    selector: 'city-list',
    templateUrl: 'city-list.component.html',
    styleUrls:['city-list.component.css', "../bootstrap.min.css"]
})
export class CityListComponent implements OnInit {
    constructor (private cityService:CityService){}

    delayInSecs:Number;

    @Input()
    selectedCity:City;

    @Input()
    cityList:CityList;

    @Output() cityChange = new EventEmitter();

    ngOnInit() { }

    getNextCities():void{
        this.cityService.setCurrentDelay(this.delayInSecs);
        this.cityService.getCityListNext(this.cityList).subscribe(p => this.cityList = p);
        console.log(`Selected City: ${this.selectedCity.name}`);
    }
    
    getPrevCities():void{
        this.cityService.setCurrentDelay(this.delayInSecs);
        this.cityService.getCityListPrev(this.cityList).subscribe(p => this.cityList = p);
        console.log(`Selected City: ${this.selectedCity.name}`);
    }
    
    getFirstCities():void{
        this.cityService.setCurrentDelay(this.delayInSecs);
        this.cityService.getCityListFirst(this.cityList).subscribe(p => this.cityList = p);
    }
    getLastCities():void{
        this.cityService.setCurrentDelay(this.delayInSecs);
        this.cityService.getCityListLast(this.cityList).subscribe(p => this.cityList = p);
    }

    onSelect(city: City): void {
    this.selectedCity = city;
    this.cityChange.emit({value:city});
    }

    isFirstPage():boolean {
        return this.cityList.page.num == 0;
    }
    isLastPage():boolean {
        return this.cityList.page.num == this.cityList.page.totalPages - 1;
    }

    getStyleForSelection(city:City):boolean{
        if (city != undefined && this.selectedCity != undefined)
            return this.selectedCity.name == city.name;
        else
            return false;
    }        
        
}
