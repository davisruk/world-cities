export class City {
    district:string;
    name:string;
    population:number;
    links:{self:{href:string},
            city:{href:string},
            country:{href:string}
    }

    toString():string{
        return `District:${this.district}\nName:${this.name}`;
    }
};
