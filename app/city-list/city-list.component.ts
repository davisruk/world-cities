import { Component, OnInit, Input, Output, EventEmitter,OnChanges, SimpleChange } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';

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
    constructor (private cityService:CityService){
    }

    delayInSecs:Number;
    
    private searchTerms = new Subject<string>();
 
    @Input()
    selectedCity:City;

    @Input()
    cityList:CityList;

    observableList:Observable<CityList>;

    @Output() cityChange = new EventEmitter();

    ngOnInit() {
        this.delayInSecs = 0;
        this.observableList = this.searchTerms
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap(term => term ? this.cityService.search(term) : Observable.of<CityList>())
        .catch(error => {
            console.log(error);
            return Observable.of<CityList>();
        });
        this.observableList.subscribe(p => this.cityList = p);
        
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }


    processDelay(term: string): void {
        if (term == undefined || term == "")
            term="0";
        this.delayInSecs = Number.parseInt(term);
    }

    getNextCities():void{
        this.cityService.setCurrentDelay(this.delayInSecs);
        this.cityService.getCityListNext(this.cityList).subscribe(p => this.cityList = p);
    }
    
    getPrevCities():void{
        this.cityService.setCurrentDelay(this.delayInSecs);
        this.cityService.getCityListPrev(this.cityList).subscribe(p => this.cityList = p);
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
            return this.selectedCity.id == city.id;
        else
            return false;
    }        

}
