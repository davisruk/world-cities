import { Component, OnInit, Input } from '@angular/core';
import { City } from '../model/city'

@Component({
    moduleId: module.id,
    selector: 'city-detail',
    templateUrl: 'city-detail.component.html',
    styleUrls:["../bootstrap.min.css","city-detail.component.css" ]
})
export class CityDetailComponent implements OnInit {
    @Input()
    city:City
    constructor() { }

    ngOnInit() { }
}