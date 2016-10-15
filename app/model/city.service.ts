import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {City} from './city';

@Injectable()
export class CityService{
    
    constructor(private http:Http){};
    citiesUrl = "http://localhost:8080/cities/1";
    
    // example to show structure of JSON 
    getCity():City{
        return { "district":"Kabol",
                    "name":"Kabul",
                    "population":1780000,
                    "links": {  "self":{"href":"http://localhost:8080/cities/1"},
                                "city":{"href":"http://localhost:8080/cities/1"},
                                "country":{"href":"http://localhost:8080/cities/1/country"}
                            }
                };
    }

    getCityFromWeb(): Observable<City>{
        let city$ = this.http
            .get(`${this.citiesUrl}`, {headers: this.getHeaders()})
            .map(mapCity);
            console.log('Returning:', city$);
      return city$;
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

function mapCity(response:Response): City{
    let r = response.json();
    let city = <City>({
        district: r.district,
        name: r.name,
        population: r.population,
        links:r._links
    });
    console.log('Parsed city:', city);
    return city;
}

