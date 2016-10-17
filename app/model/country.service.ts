import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {City} from './city';
import {CityService} from './city.service';
import {Country} from './country';

@Injectable()
export class CountryService{
    
    constructor(private http:Http){};

    getCountryForCity(city:City):Observable<Country>{
        return this.http.get(city._links.country.href, {headers: this.getHeaders()})
            .map(mapCountry);
    }

    getCountryByCode(code:string):Observable<Country>{
        let url=`http://localhost:8080/countries/${code}`;
        return this.http.get(url, {headers: this.getHeaders()})
            .map(mapCountry);
    }

 private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

}
function mapCountry(response:Response): Country{
    let country = response.json();
    var arr = String(country._links.self.href).split("/");
    country.code = arr[arr.length-1];
    country.capitalName = "Fetching..." 
    return country;
 
}
