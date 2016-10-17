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

    citiesUrl = "http://localhost:8080/cities?size=15";
    citiesSearchUrl = "http://localhost:8080/cities/search/findByNameContaining?name=";   
    currentDelay:Number = 0;

    setCurrentDelay(delay:Number){
        this.currentDelay=delay;
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
        // prev needs to take one off the current page
        // and substute it into the next page URL
        let url=cl._links.first.href;
        let prevPage = "page="+(cl.page.num - 1);
        let newUrl = url.replace("page=0", prevPage);
        return this.getCitiesByUrl(newUrl);
    }

    search(term: string): Observable<CityList> {
        return this.getCitiesByUrl(`${this.citiesSearchUrl}${term}&size=15`);
    }

    getCitiesByUrl(url:string): Observable<CityList>{
        if (this.currentDelay != undefined)
            url = url + `&delay=${this.currentDelay}`;

        let cities$ = this.http
            .get(url, {headers: this.getHeaders()})
            .map(mapCityList);
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


function toCity(r:Response): City{
    let city = <City><any> r;
    var arr = String(city._links.self.href).split("/");
    city.id = parseInt(arr[arr.length-1]);
    return city;
}

function mapCityList(response:Response): CityList{
    let cityList:CityList = ({
        cities:mapCityArray(response),
        _links:mapCityListLinks(response),
        page:mapPage(response)
    });
    return cityList;
}

// helper functions to convert JSON to our model
function mapCity(response:Response): City{
    return toCity(response.json()); 
}
function mapCityArray(r:Response): City[]{
    // can't just cast to City[] as our REST API doesn't return the id explicitly
    // instead it is contained within the link to self so needs special treatment
    return r.json()._embedded.cities.map(toCity);
    
}
function mapPage(r:Response): ListInfo{
    let page$ = r.json().page;
      return ({
        totalPages:page$.totalPages,
        num:page$.number,
        size:page$.size,
        totalElements:page$.totalElements
    });
 }
function mapCityListLinks(r:Response): any{
    let links$ = r.json()._links;
    return ({first : {href:links$.first==undefined ? "none" : links$.first.href}, // first is never undefined
            next : {href: links$.next==undefined ? "none" : links$.next.href},
            last : {href:links$.last==undefined ? "none" : links$.last.href},
            profile : {href:links$.profile==undefined ? "none" : links$.profile.href},
            search : {href:links$.search==undefined ? "none" : links$.search.href},
            self: {href:links$.self==undefined ? "none" : links$.self.href}
            });
}
function printCityToConsole(m:string, c:City):void{
    console.log (`${m}\nName:${c.name} District:${c.district} Pop:${c.population}`);
}
