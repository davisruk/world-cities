import { Component, OnInit, Input } from '@angular/core';
import { City } from '../model/city'
import { CityService } from '../model/city.service'

@Component({
    moduleId: module.id,
    selector: 'city-detail',
    templateUrl: 'city-detail.component.html',
    styleUrls:["../bootstrap.min.css","city-detail.component.css" ]
})
export class CityDetailComponent implements OnInit {
    @Input()
    city:City
    constructor(private cityService:CityService) { }

    ngOnInit() { }

    updateCity(){
        this.cityService.updateCity(this.city).subscribe(p=>{
            if (p!=undefined)
                this.city=p});
    }

}