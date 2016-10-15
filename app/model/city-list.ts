import {City} from './city';

export class CityList{
    cities:City[];
    _links:{first:{href:string},
            self:{href:string},
            next:{href:string},
            last:{href:string},
            profile:{href:string},
            search:{href:string},
    };
    page:ListInfo;
}

export class ListInfo {
    size:number;
    totalElements:number;
    totalPages:number;
    num:number;
}