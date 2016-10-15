export class City {
    id:number;
    district:string;
    name:string;
    population:number;
    _links:{self:{href:string},
            city:{href:string},
            country:{href:string}
    }
};
