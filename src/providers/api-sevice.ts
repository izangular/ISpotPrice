// import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    // This is where your methods and properties go, for example: 
    constructor(private http: Http){}

    getData(imagedata:any, latitude:number, longitude:number) {

    }
}