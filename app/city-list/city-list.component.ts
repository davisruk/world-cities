import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CityList} from '../model/city-list';
import {CityService} from '../model/city.service';
import {City} from '../model/city';
@Component({
    moduleId: module.id,
    selector: 'city-list',
    templateUrl: 'city-list.component.html',
    styleUrls:['city-list.component.css']
})
export class CityListComponent implements OnInit {
    constructor (private cityService:CityService){}
    @Input()
    cityList:CityList;
    @Output() cityChange = new EventEmitter();
    ngOnInit() { }

    getNextCities():void{
        this.cityService.getCityListNext(this.cityList).subscribe(p => this.cityList = p);
    }
    
    getPrevCities():void{
        this.cityService.getCityListPrev(this.cityList).subscribe(p => this.cityList = p);
    }
    
    getFirstCities():void{
        this.cityService.getCityListFirst(this.cityList).subscribe(p => this.cityList = p);
    }
    getLastCities():void{
        this.cityService.getCityListLast(this.cityList).subscribe(p => this.cityList = p);
    }
    onSelect(city: City): void {
    this.cityChange.emit({value:city});
    }
    isFirstPage():boolean {
        return this.cityList.page.num == 0;
    }
    isLastPage():boolean {
        return this.cityList.page.num == this.cityList.page.totalPages - 1;
    }        
        
}