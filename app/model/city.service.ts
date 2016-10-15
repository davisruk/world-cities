import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {City} from './city';
import {CityList} from './city-list';
import {ListInfo} from './city-list';
@Injectable()
export class CityService{
    
    constructor(private http:Http){};
    citiesUrl = "http://localhost:8080/cities";    
    // example to show structure of JSON 
    getCity():City{
        return {    "id": 1,
                    "district":"Kabol",
                    "name":"Kabul",
                    "population":1780000,
                    "links": {  "self":{"href":"http://localhost:8080/cities/1"},
                                "city":{"href":"http://localhost:8080/cities/1"},
                                "country":{"href":"http://localhost:8080/cities/1/country"}
                            }
                };
    }

    getCityById(id:number): Observable<City>{
        let city$ = this.http
            .get(`${this.citiesUrl}/${id}`, {headers: this.getHeaders()})
            .map(mapCity);
            console.log('Returning:', city$);
      return city$;
    }

    getCityList(): Observable<CityList>{
        let cities$ = this.http
            .get(`${this.citiesUrl}`, {headers: this.getHeaders()})
            .map(mapCityList);
            console.log('Returning:', cities$);
      return cities$;
 
    }

    getCityListNext(cl:CityList): Observable<CityList>{
        return this.getCitiesByUrl(cl._links.next.href);
    }
    
    getCityListFirst(cl:CityList): Observable<CityList>{
        return this.getCitiesByUrl(cl._links.first.href);
    }

    getCityListLast(cl:CityList): Observable<CityList>{
        return this.getCitiesByUrl(cl._links.last.href);
    }

    getCityListPrev(cl:CityList): Observable<CityList>{
        // special case as our REST API only handles next
        let url=cl._links.next.href;
        let nextPage:string;
        if (cl.page.num == cl.page.totalPages - 1)
            nextPage = "page="+cl.page.num;
        else
            nextPage = "page="+(cl.page.num + 1);
        
        let prevPage = "page="+(cl.page.num - 1);
        let newUrl = url.replace(nextPage, prevPage);
        return this.getCitiesByUrl(newUrl);
    }

    getCitiesByUrl(url:string): Observable<CityList>{
        let cities$ = this.http
            .get(url, {headers: this.getHeaders()})
            .map(mapCityList);
            console.log('Returning:', cities$);
      return cities$;
 
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

function toCity(r:any): City{
    //let r = response.json();
    let city = <City>({
        district: r.district,
        name: r.name,
        population: r.population,
        links:r._links
    });
    printCityToConsole("Mapped City: ",city);
    var arr = String(city.links.self.href).split("/");
    city.id = parseInt(arr[arr.length-1]);
    console.log('Parsed city:', city);
    return city;
}

function mapCityList(response:any): CityList{
    let cityList:CityList = ({
        cities:mapCityArray(response),
        _links:mapCityListLinks(response),
        page:mapPage(response)
    });
    return cityList;
}
function mapCity(response:Response): City{
    return toCity(response.json()); 
}
function mapCityArray(r:any): City[]{
    return r.json()._embedded.cities.map(toCity);
}
function mapPage(r:any): ListInfo{
    let page$ = r.json().page;
      return ({
        totalPages:page$.totalPages,
        num:page$.number,
        size:page$.size,
        totalElements:page$.totalElements
    });
 }
function mapCityListLinks(r:any): any{
    let links$ = r.json()._links;
    return ({first : {href:links$.first.href},
            next : {href: links$.next==undefined ? links$.last.href : links$.next.href}, // special case - next is undefined if this is the last page
            last : {href:links$.last.href},
            profile : {href:links$.profile.href},
            search : {href:links$.search.href}
            });
}
function printCityToConsole(m:string, c:City):void{
    console.log (`${m}\nName:${c.name} District:${c.district} Pop:${c.population}`);
}
