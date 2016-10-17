import { Component, OnInit, Input } from '@angular/core';

import {City} from "../model/city";
import {Country} from "../model/country";

@Component({
    moduleId: module.id,
    selector: 'country-detail',
    templateUrl: 'country-detail.component.html',
    styleUrls: ["../bootstrap.min.css"]
})
export class CountryDetailComponent implements OnInit {
    constructor() { }

    @Input()
    selectedCity:City;
    @Input()
    country:Country;
    @Input()
    capitalCity:City;

    ngOnInit() {
    }
}
