import { Component, OnInit } from '@angular/core';
import { CityService } from './model/city.service';
import { City } from './model/city';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
                <div *ngIf="city != null">
                    <h2>City from Web: {{city.name}}, {{city.district}}, {{city.population}}</h2><br>
                </div>
                `,
    providers: [CityService]
})
export class AppComponent implements OnInit{ 
    constructor (private cityService:CityService){}
    title = "Cities of the World";
    city:City;

    ngOnInit():void{
        this.cityService.getCityFromWeb().subscribe(p => this.city = p);        
    }
}
